import express from 'express';
import usosCommunication from "../../UsosAuth/usosCommunication.mjs";
import * as qs from 'querystring';

export const accountApiRouter = express.Router();

//login
accountApiRouter.get('/login', async (request, response) => {
    const urlLinkAndToken = await usosCommunication.getAuthorize();
    response.json(urlLinkAndToken);

    accountApiRouter.get('/callback/', function (request, response) {
        const oauth_verifier = request.query.oauth_verifier;
        const oauth_token = request.query.oauth_token;
        const auth_data = qs.parse(request.body);
        let oauth = {consumer_key: oauth.consumer_key,
            consumer_secret: oauth.consumer_secret,
            token: oauth_token,
            token_secret: req_data.oauth_token_secret,
            verifier:  oauth_verifier
        };
        const url = 'https://usosapps.umk.pl/services/oauth/access_token';

        request.post({url:url, oauth:oauth}, function (e, r, body) {
            const perm_data = qs.parse(body);
            oauth = {consumer_key: oauth.consumer_key,
                consumer_secret: oauth.consumer_secret,
                token: perm_data.oauth_token,
                token_secret: perm_data.oauth_token_secret
            };
            console.log("[Debug] Info o uzyskanych kodach:");
            console.log(oauth);
            logindata(oauth);
        });
        response.redirect('/');
    });

});

//logout
accountApiRouter.get('/logout', async (request, response) => {
    const name = request.query.name;
    const surname = request.query.surname;
    if(surname === '' || surname === undefined)
        response.status(400).render('error', {status : 400});
    else if(name !== '' || name !== undefined) response.json({id: 1, name:name, surname: surname, role: 'Student'});
    else response.json({id: 1, surname: surname, role: 'Student'});
});
