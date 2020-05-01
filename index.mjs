import express from 'express';
import UsosCommunication from "./UsosAuth/usosCommunication.mjs";
import {usosApiRouter}  from './routes/api/usosAPI.mjs';

const port = process.env.PORT || 3000;
const app = express();

/*App settings*/
app.set('view engine', 'pug')
app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})
app.enable('view cache');
app.listen(port, () => console.log(`Server started on port ${port}`));
app.use('/api/usos', usosApiRouter);
UsosCommunication.getRequestToken();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send(err);
});
