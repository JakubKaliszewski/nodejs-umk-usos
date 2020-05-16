import express from 'express';
import usosCommunication from "../../usosCommunication/usosCommunication.mjs";
import got from "got";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import * as qs from 'querystring';
import {sessionSettings} from "../../sessionSettings.mjs";

export const accountApiRouter = express.Router();

accountApiRouter.use(sessionSettings);

//login
accountApiRouter.get('/login', async (request, response) => {
    if(request.session.oauth_access_token === undefined){
        const urlLinkAndToken = await usosCommunication.getAuthorize();
        const oauth_token = urlLinkAndToken.oauth_token.oauth_token;
        const oauth_token_secret = urlLinkAndToken.oauth_token.oauth_token_secret;

        request.session.requestToken = oauth_token;
        request.session.requestTokenSecret = oauth_token_secret;
        response.json(urlLinkAndToken);
    }else{
        const logoutUrl = 'https://usosweb.umk.pl/kontroler.php?_action=logowaniecas/wyloguj';
        //revoke token
        const access_token = request.session.oauth_access_token
        const access_token_secret = request.session.oauth_secret_token;
        const token = {
            key: access_token,
            secret: access_token_secret
        };

        await usosCommunication.revokeToken(token);
        response.clearCookie();
        request.session.destroy();
        response.json({url: logoutUrl});
    }
});

//callback dla Oauth1.0a z login.umk.pl
accountApiRouter.get('/callback/', async function (request, response) {
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

    const loginUserDetailsResponse = await usosCommunication.searchUserDetails(
        null,
        {key: perm_data.oauth_token, secret:perm_data.oauth_token_secret },
        "photo_urls|first_name|last_name"
    );

    request.session.user_name = `${loginUserDetailsResponse.first_name} ${loginUserDetailsResponse.last_name}`;
    request.session.user_image = loginUserDetailsResponse.photo_urls["50x50"];

    response.redirect('/');
});
