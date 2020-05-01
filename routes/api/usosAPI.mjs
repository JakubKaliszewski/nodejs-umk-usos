import express from 'express';
export const usosApiRouter = express.Router();

//Get user
usosApiRouter.get('/user', async (request, response) => {
    const name = request.query.name;
    const surname = request.query.surname;
    if(name === '' || surname === '' || name === undefined || surname === undefined)
        response.status(400).send();
    else response.send(`${name} ${surname}`);
});

//Get staff by userId
usosApiRouter.get('/staff', async (request, response) => {
    const userId = request.query.userId;
    if(userId === '' || userId === undefined)
        response.status(400).send();
    else response.send(userId);
});
