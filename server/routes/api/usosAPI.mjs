import express from 'express';
export const usosApiRouter = express.Router();

//Get user
usosApiRouter.get('/', (request, response) => {
    response.send('hello!');
});
//Get staff



