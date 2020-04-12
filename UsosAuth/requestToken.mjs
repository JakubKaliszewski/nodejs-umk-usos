import * as crypto from "crypto";

export default class RequestToken{
    constructor(consumerKey, consumerSecret, callback) {
        this.oauth_consumer_key = consumerKey;
        this.oauth_signature = this.generateSignature(consumerKey, consumerSecret);
        this.oauth_signature_method = 'HMAC-SHA1';
        this.oauth_timestamp = new Date().getTime();
    }

    generateSignature(key, secret){
        return crypto.createHmac('sha1', key).update(secret).digest('hex');
    }
}
/*
var crypto = require('crypto')
  , text = 'I love cupcakes'
  , key = 'abcdeg'
  , hash
a
hash = crypto.createHmac('sha1', key).update(text).digest('hex')
 */

/*Obowiązkowo
oauth_callback !
oauth_consumer_key,!
oauth_nonce,
 oauth_timestamp,
  oauth_signature,
   oauth_signature_method,
    oauth_version


 */
