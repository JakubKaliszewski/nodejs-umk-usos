import express from 'express';
import session from "express-session";
export const usosApiRouter = express.Router();
/* Ustawienia sesji */
const sessionSettings = session({
    secret: Math.random().toString(36).substring(2),
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 7200000,
        secure: true
    }
});
usosApiRouter.use(sessionSettings);

//Get user
usosApiRouter.get('/user', async (request, response) => {
    const name = request.query.name;
    const surname = request.query.surname;
    if(surname === '' || surname === undefined)
        response.status(400).render('error', {status : 400});
    else if(name !== '' || name !== undefined) response.json({id: 1, name:name, surname: surname, role: 'Student'});
    else response.json({id: 1, surname: surname, role: 'Student'});
});

//Get staff by userId
usosApiRouter.get('/staff', async (request, response) => {
    const userId = request.query.userId;
    if(userId === '' || userId === undefined)
        response.status(400).render('error', {status : 400});
    else response.send(userId);
});
