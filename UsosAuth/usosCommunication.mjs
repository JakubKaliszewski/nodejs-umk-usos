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

export default class UsosCommunication{

    static apiKeysFile = "/apiKeys.json";
    static keys = null;
    static hostname = "https://usosapps.umk.pl";
    static authorizeUrl = "/services/oauth/authorize";
    static requestTokenUrl = "/services/oauth/request_token";
    static searchUrl = "/services/users/search2";
    static staffUrl = "/services/tt/staff";

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
        console.log(requestToken)
        return requestToken;
    }

    //TODO do zrobienia od zera
    static async getAuthorize(token){
        await this.loadKeys();
        const oauth = OAuth({
            consumer: {
                key: this.keys.consumerKey,
                secret: this.keys.consumerSecret
            },
            signature_method: 'HMAC-SHA1',
            oauth_token: token,
            hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
        });

        const url = this.hostname + this.authorizeUrl;
        const response = await got.post(url, {
            headers: oauth.toHeader(oauth.authorize({url, method: 'POST', data :{oauth_callback: "http://127.0.0.1:3000/callback"}}))
        });
        const requestData = qs.parse(response.body);
        console.log(requestData)
    }

    static async searchUser(query){
        await this.loadKeys();
        const oauth = OAuth({
            consumer: {
                key: this.keys.consumerKey,
                secret: this.keys.consumerSecret
            },
            signature_method: 'HMAC-SHA1',
            hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
        });
        const url = query=== null || query=== undefined ? '`https://usosapps.umk.pl/services/users/search2?lang=pl' : `https://usosapps.umk.pl/services/users/search2?lang=pl&query=${query}`;
        const response = await got.post(
            url,
            {headers: oauth.toHeader(oauth.authorize({url, method: 'POST'}))
        });

        const requestData = JSON.parse(response.body);
        console.log(requestData.items);
        console.log(requestData)
    }

    static async cleanTextFromTags(text){
        return text.replace(/<\/?[^>]+(>|$)/g, "");
    }

    static async getUserStaffById(userId){
        //todo
    }
}
