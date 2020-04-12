/*Komunikacja z API usosa, pozyskanie danych z ich serwerów. Nic więcej.
Metody:
https://usosapps.umk.pl/developers/api/services/users/#search2
https://usosapps.umk.pl/developers/api/services/tt/#staff

Autoryzacja
Metoda OAuth 1.0a
Metoda na wczytanie kluczy pozyskanych - znajdują się w pliku

Testy można zrealizować w Mocha
*/

import fileOperation from "./fileOperation";
import * as http from "node/https";

export default class UsosAPI{
    static apiKeysFile = "apiKeys.json";
    static keys = null;
    static authorizeUrl = "https://usosapps.umk.pl/services/oauth/authorize";

    static async loadKeys(){
        if (this.keys === null)
            this.keys = await fileOperation.readFile(this.apiKeysFile)
    }

    static async searchUser(query){
        //todo
    }

    static async getUserStaffById(userId){
        //todo
        //do wykonania zapytań
        const req = http.request({
            host: '127.0.0.1',
            port: 8080,
            method: 'POST'
        }, (res) => {
            res.resume();
            res.on('end', () => {
                if (!res.complete)
                    console.error(
                        'The connection was terminated while the message was still being sent');
            });
        });

    }
}
//oauth_signature = HMAC1-SHA1(txt:secret, key: consumerKey
/*
var https = require('follow-redirects').https;
var fs = require('fs');

var qs = require('querystring');

var options = {
  'method': 'POST',
  'hostname': 'usosapps.umk.pl',
  'path': '/services/oauth/request_token',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = qs.stringify({
  'oauth_callback': 'http://127.0.0.1:3000/callback',
  'oauth_consumer_key': 'C3Bsk7ZFESaWkKDRqsKT',
  'oauth_token': '',
  'oauth_signature_method': 'HMAC-SHA1',
  'oauth_timestamp': '1586609956',
  'oauth_nonce': 'EatxqWSOSoB',
  'oauth_version': '1.0',
  'oauth_signature': '/rPxgZ3j7PvdDS2jbEYVDqyjByU='
});

req.write(postData);

req.end();
 */
