import express from 'express';
import UsosComunnication from "./UsosAuth/usosComunnication.mjs";

const port = process.env.PORT || 3000;
const app = express();

/*App settings*/
//app.use('/api/', usosApi);
app.listen(port, () => console.log(`Server started on port ${port}`));

UsosComunnication.getRequestToken();
