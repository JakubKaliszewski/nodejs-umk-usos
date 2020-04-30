import express from 'express';
import UsosCommunication from "./UsosAuth/usosCommunication.mjs";

const port = process.env.PORT || 3000;
const app = express();

/*App settings*/
//app.use('/api/', usosApi);
app.listen(port, () => console.log(`Server started on port ${port}`));

UsosCommunication.getRequestToken();
