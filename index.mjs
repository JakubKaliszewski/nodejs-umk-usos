import express from 'express';
import {usosApiRouter}  from './routes/api/usosAPI.mjs';
import {accountApiRouter} from "./routes/api/account.mjs";
import * as https from 'https';
import * as fs from 'fs';
import ip from "ip";

const port = process.env.PORT || 3000;
export const hostAddress = ip.address().toString();

const app = express();

/* Ustawienia serwera */
app.set('view engine', 'pug');
// Ustawiamy katalog public na skrypty / bundle
app.use(express.static('public'));
// Punkt dostępu / - strona główna
app.get('/', async function (request, response) {
    response.render('index', { title: 'UMK Users' })
});
// Punkt dostępny /about - O stronie
app.get('/about', async function (request, response) {
    response.render('about', { title: 'O UMK Users' })
});
// Punkt dostępowy dla API pozyskiwania informacji z Usosa
app.use('/api/usos', usosApiRouter);
// Punkt dostępowy do obsługi logowania / wylogowania
app.use('/api/account', accountApiRouter);
// Wyłapuje próbę dostępu do niezdefiniowanego punktu, strona status 404
app.use(async function(request, response) {
    response.status = 404;
    response.render('error', {status: 404});
});

// Certyfikat dla https-a
https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'zaq1@WSX'
}, app).listen(port, () => console.log(`Server started on https://${hostAddress}:${port}`));
