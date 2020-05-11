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
import {hostAddress} from "../index.mjs";

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

    static getKeys(){
        return this.keys;
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
            headers: oauth.toHeader(oauth.authorize({url, method: 'POST', data :{oauth_callback: `https://${hostAddress}:3000/api/account/callback`}}))
        });
        return qs.parse(response.body);
    }

    static async getAuthorize(){
        let token = await this.getRequestToken();
        let url = `${this.hostname}${this.authorizeUrl}?${qs.stringify(token)}`;
        return {url: url, oauth_token: token};
    }

    static async searchUser(query, token){
        await this.loadKeys();
        const oauth = OAuth({
            consumer: {
                key: this.keys.consumerKey,
                secret: this.keys.consumerSecret
            },
            signature_method: 'HMAC-SHA1',
            hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
        });
        const url = query=== null || query=== undefined ? `${this.hostname}${this.searchUrl}?lang=pl` : `${this.hostname}${this.searchUrl}?lang=pl&query=${query}`;
        const response = await got.post(
            url,
            {headers: oauth.toHeader(oauth.authorize({url, method: 'POST'}, token))
        });

        const requestData = JSON.parse(response.body);
        console.log(requestData.items);
        return requestData;
    }

    static async cleanTextFromTags(text){
        return text.replace(/<\/?[^>]+(>|$)/g, "");
    }

    static async getUserStaffById(userId, token){
        await this.loadKeys();
        const oauth = OAuth({
            consumer: {
                key: this.keys.consumerKey,
                secret: this.keys.consumerSecret
            },
            signature_method: 'HMAC-SHA1',
            hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
        });
        const url = userId === null || userId === undefined ? `${this.hostname}${this.staffUrl}?user_id=` : `${this.hostname}${this.staffUrl}?user_id=${userId}`;
        const response = await got.post(
            url,
            {headers: oauth.toHeader(oauth.authorize({url, method: 'POST'}))
            });

        const requestData = JSON.parse(response.body);
        console.log(requestData)
        return requestData;
    }
}
