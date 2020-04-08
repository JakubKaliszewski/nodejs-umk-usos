// To rozwiązanie autoryzacji jest oparate o bibliotekę 'request', która nie jest już rozwijana:
// https://www.npmjs.com/package/request

const request = require('request');
const qs = require('querystring');

let oauth = {callback: 'http://127.0.0.1:3000/callback',
	     consumer_key: 'TWÓJ KLUCZ',
	     consumer_secret: 'TWÓJ SEKRET'
	    };
   
let url = 'https://usosapps.umk.pl/services/oauth/request_token';

const login = (app, logindata) => {
    request.post({url:url, oauth:oauth}, function (e, r, body) {
	const req_data = qs.parse(body);
	url = 'https://usosapps.umk.pl/services/oauth/authorize' + '?' + qs.stringify({oauth_token: req_data.oauth_token});

	console.log("Aby kontynować autoryzacje, naciśnij na link:");
	console.log(url);
	
	app.get('/callback', function (req, res) {
	    res.send('Hello USOS');
	    const verifier = qs.parse(req.originalUrl).oauth_verifier;
	    const auth_data = qs.parse(body);
  	    oauth = {consumer_key: oauth.consumer_key,
		     consumer_secret: oauth.consumer_secret,
  		     token: auth_data.oauth_token,
  		     token_secret: req_data.oauth_token_secret,
  		     verifier: verifier
  		    };
  	    url = 'https://usosapps.umk.pl/services/oauth/access_token';
	    
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
	});
    });

};

module.exports.login = login;
