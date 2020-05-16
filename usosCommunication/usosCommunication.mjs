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
    static searchUserDetailsUrl = "/services/users/user";
    static revokeUrl = "/services/oauth/revoke_token";

    static async loadKeys(){
        if (this.keys === null)
            this.keys = await fileOperation.readFile(__dirname + this.apiKeysFile)
    }

    static async getKeys(){
        await this.loadKeys();
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
        let response;
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
        if(token !== null){
             response = await got.post(
                url,
                {headers: oauth.toHeader(oauth.authorize({url, method: 'POST'}, token))
                });
        }else{
            response = await got.post(
                url,
                {headers: oauth.toHeader(oauth.authorize({url, method: 'POST'}))
                });
        }


        const requestData = JSON.parse(response.body);
        return requestData;
    }

    //https://usosapps.umk.pl/developers/api/services/users/#user
    static async searchUserDetails(
        userId = null,
        token,
        fields = "titles|student_status|staff_status|email|homepage_url|photo_urls|employment_functions|employment_positions|student_number"
    ){
        await this.loadKeys();
        const oauth = OAuth({
            consumer: {
                key: this.keys.consumerKey,
                secret: this.keys.consumerSecret
            },
            signature_method: 'HMAC-SHA1',
            hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
        });
        let url;
        if(userId === null)
            url =`${this.hostname}${this.searchUserDetailsUrl}?fields=${fields}`;
        else url =`${this.hostname}${this.searchUserDetailsUrl}?user_id=${userId}&fields=${fields}`;
        const response = await got.get(
            url,
            {headers: oauth.toHeader(oauth.authorize({url, method: 'GET'}, token))
            });

        const requestData = JSON.parse(response.body);
        return requestData;
    }

    static async revokeToken(token){
        await this.loadKeys();
        const oauth = OAuth({
            consumer: {
                key: this.keys.consumerKey,
                secret: this.keys.consumerSecret
            },
            signature_method: 'HMAC-SHA1',
            hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
        });
        const url = `${this.hostname}${this.revokeUrl}`;
        const response = await got.post(
            url,
            {
                headers: oauth.toHeader(oauth.authorize({url, method: 'POST'}, token))
            });
    }
}
