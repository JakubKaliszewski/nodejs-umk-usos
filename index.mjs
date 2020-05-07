import express from 'express';
import UsosCommunication from "./UsosAuth/usosCommunication.mjs";
import {usosApiRouter}  from './routes/api/usosAPI.mjs';
import {accountApiRouter} from "./routes/api/account.mjs";
import * as https from 'https';
import * as fs from 'fs';

const port = process.env.PORT || 3000;
const app = express();

/*App settings*/
app.set('view engine', 'pug')
// Set Public Folder
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.render('index', { title: 'UMK Users' })
})
app.get('/about', function (req, res) {
    res.render('about', { title: 'O UMK Users' })
})
app.use('/api/usos', usosApiRouter);
app.use('/api/account', accountApiRouter);
//UsosCommunication.getRequestToken();
//UsosCommunication.searchUser("Barbara Polaszek");
//UsosCommunication.getUserStaffById('35511');
//UsosCommunication.getAuthorize();
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status = 404;
    res.render('error', {status: 404});
});

https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'zaq1@WSX'
}, app).listen(port, () => console.log(`Server started on port ${port}`));
