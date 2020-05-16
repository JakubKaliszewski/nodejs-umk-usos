import express from 'express';
import {usosApiRouter}  from './routes/api/usosAPI.mjs';
import {accountApiRouter} from "./routes/api/account.mjs";
import * as https from 'https';
import * as fs from 'fs';
import ip from "ip";
import {sessionSettings} from "./sessionSettings.mjs";

const port = process.env.PORT || 3000;
export const hostAddress = ip.address().toString();

const app = express();
app.use(sessionSettings);

/* Ustawienia serwera */
app.set('view engine', 'pug');
// Ustawiamy katalog public na skrypty / bundle
app.use(express.static('public'));
// Punkt dostępu / - strona główna
app.get('/', async function (request, response) {
    let loginStatus = await getLoginStatusObject(request);
    response.render('index', { title: 'UMK Users', user: loginStatus })
});
// Punkt dostępny /about - O stronie
app.get('/about', async function (request, response) {
    let loginStatus = await getLoginStatusObject(request);
    response.render('about', { title: 'O UMK Users', user: loginStatus})
});
// Punkt dostępowy dla API pozyskiwania informacji z Usosa
app.use('/api/usos', usosApiRouter);
// Punkt dostępowy do obsługi logowania / wylogowania
app.use('/api/account', accountApiRouter);
// Wyłapuje próbę dostępu do niezdefiniowanego punktu, strona status 404
app.use(async function(request, response) {
    response.status = 404;
    let loginStatus = await getLoginStatusObject(request);
    response.render('error', {status: 404, user: loginStatus});
});

// Certyfikat dla https-a
https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'zaq1@WSX'
}, app).listen(port, () => console.log(`Server started on https://${hostAddress}:${port}`));


async function getLoginStatusObject(request) {
    if(request.session === undefined)
        return {button:"Zaloguj się"};
    if(request.session.oauth_access_token === undefined)
        return {button: "Zaloguj się"};
    return {button: "Wyloguj się", name: request.session.user_name, image: request.session.user_image};
}
