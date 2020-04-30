import express from 'express';
import UsosCommunication from "./UsosAuth/usosCommunication.mjs";
import {usosApiRouter}  from './routes/api/usosAPI.mjs';

const port = process.env.PORT || 3000;
const app = express();

/*App settings*/
app.listen(port, () => console.log(`Server started on port ${port}`));
app.use('/api/usos', usosApiRouter);
UsosCommunication.getRequestToken();
