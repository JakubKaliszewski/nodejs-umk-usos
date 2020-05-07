import express from 'express';
import usosCommunication from "../../UsosAuth/usosCommunication.mjs";
import got from "got";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

export const accountApiRouter = express.Router();

//login
accountApiRouter.get('/login', async (request, response) => {
    const urlLinkAndToken = await usosCommunication.getAuthorize();
    const oauth_token = urlLinkAndToken.oauth_token.oauth_token;
    const oauth_token_secret = urlLinkAndToken.oauth_token.oauth_token_secret;
    response.json(urlLinkAndToken);

    accountApiRouter.get('/callback/', async function (request, response) {
        const oauth_verifier = request.query.oauth_verifier;

        const token = {
            key: oauth_token,
            secret: oauth_token_secret
        };

        const oauth = OAuth({
            consumer: {
                consumer_key: usosCommunication.keys.consumer_key,
                consumer_secret: usosCommunication.keys.consumer_secret,
            },
            signature_method: 'HMAC-SHA1',
            hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
        });

        const url = 'https://usosapps.umk.pl/services/oauth/access_token';
        const tokenResponse = await got.post(url, { headers: oauth.toHeader(oauth.authorize({ url, method: "POST", oauth_verifier: oauth_verifier }, token))});

        const perm_data = qs.parse(tokenResponse.body);

        console.log("[Debug] Info o uzyskanych kodach:");
        console.log(perm_data);

        response.redirect('/');
    });
});


//logout
accountApiRouter.get('/logout', async (request, response) => {
    const name = request.query.name;
    const surname = request.query.surname;
    if (surname === '' || surname === undefined)
        response.status(400).render('error', {status: 400});
    else if (name !== '' || name !== undefined) response.json({id: 1, name: name, surname: surname, role: 'Student'});
    else response.json({id: 1, surname: surname, role: 'Student'});
});
