/*Komunikacja z API usosa, pozyskanie danych z ich serwerów. Nic więcej.
Metody:
https://usosapps.umk.pl/developers/api/services/users/#search2
https://usosapps.umk.pl/developers/api/services/tt/#staff

Autoryzacja
Metoda OAuth 1.0a
Metoda na wczytanie kluczy pozyskanych - znajdują się w pliku
*/

import fileOperation from "./fileOperation.mjs";
import got from 'got';
import OAuth from "oauth-1.0a";
import * as qs from 'querystring';
import path from 'path';
import crypto from "crypto";

const __dirname = path.resolve();

export default class UsosComunnication{

    static apiKeysFile = "/apiKeys.json";
    static keys = null;
    static hostname = "https://usosapps.umk.pl";
    static authorizeUrl = "/services/oauth/authorize";
    static requestTokenUrl = "/services/oauth/request_token";
    static searchUrl = "/developers/api/services/users/#search2";
    static staffUrl = "/developers/api/services/tt/#staff";

    static async loadKeys(){
        if (this.keys === null)
            this.keys = await fileOperation.readFile(__dirname + this.apiKeysFile)
    }

    static async getRequestToken(){
        await this.loadKeys();
        const oauth = OAuth({
            consumer: {
                key: this.keys.consumerKey,
                secret: this.keys.consumerSecret
            },
            signature_method: 'HMAC-SHA1',
            hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
        });

        const url = this.hostname + this.requestTokenUrl;
        const response = await got.post(url, {
            headers: oauth.toHeader(oauth.authorize({url, method: 'POST', data :{oauth_callback: "http://127.0.0.1:3000/callback"}}))
        });
        const requestData = qs.parse(response.body);
        const requestToken =  {
            key: requestData.oauth_token,
            secret: requestData.oauth_token_secret,
        };

        return requestToken;
    }

    static async getAuthorize(token){
        await this.loadKeys();
        const options = {
            'method': 'POST',
            'hostname': this.hostname,
            'path': this.authorizeUrl,
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            'maxRedirects': 20
        };
        const data = qs.stringify(
            new OauthData(
                token,
                'http://127.0.0.1:3000/callback',
                this.keys.consumerKey,
                this.keys.consumerSecret
                ));

        await this.doRequest(options , data,null);
    }

    static async searchUser(query){
        //todo
    }

    static async getUserStaffById(userId){
        //todo
    }
}
