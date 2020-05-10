import express from 'express';
import usosCommunication from "../../UsosAuth/usosCommunication.mjs";
import got from "got";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import * as qs from 'querystring';
import {sessionSettings} from "../../sessionSettings.mjs";

export const accountApiRouter = express.Router();

accountApiRouter.use(sessionSettings);

//login
accountApiRouter.get('/login', async (request, response) => {
    console.log(request.session.id);

    const urlLinkAndToken = await usosCommunication.getAuthorize();
    const oauth_token = urlLinkAndToken.oauth_token.oauth_token;
    const oauth_token_secret = urlLinkAndToken.oauth_token.oauth_token_secret;

    request.session.requestToken = oauth_token;
    request.session.requestTokenSecret = oauth_token_secret;
    response.json(urlLinkAndToken);
});

//callback dla Oauth1.0a z login.umk.pl
accountApiRouter.get('/callback/', async function (request, response) {
    console.log(request.session.id);

    const oauth_verifier = request.query.oauth_verifier;
    const keys = await usosCommunication.getKeys();

    const oauth_token = request.session.requestToken;
    const oauth_token_secret = request.session.requestTokenSecret;

    const token = {
        key: oauth_token,
        secret: oauth_token_secret
    };

    const oauth = OAuth({
        consumer: {
            key: keys.consumerKey,
            secret: keys.consumerSecret
        },
        signature_method: 'HMAC-SHA1',
        hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
    });

    const url = 'https://usosapps.umk.pl/services/oauth/access_token';
    const tokenResponse = await got.post(url, {
        headers: oauth.toHeader(oauth.authorize({
            url,
            method: "POST",
            data: {oauth_verifier: oauth_verifier}
        }, token))
    });

    const perm_data = qs.parse(tokenResponse.body);
    request.session.oauth_access_token = perm_data.oauth_token;
    request.session.oauth_secret_token = perm_data.oauth_token_secret;

    console.log("[Debug] Info o uzyskanych kodach:");
    console.log(perm_data);

    response.redirect('/');
});


//logout
accountApiRouter.get('/logout', async (request, response) => {

});
