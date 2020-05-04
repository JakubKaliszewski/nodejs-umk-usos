import express from 'express';
export const accountApiRouter = express.Router();

//login
accountApiRouter.get('/login', async (request, response) => {
    const name = request.query.name;
    const surname = request.query.surname;
    if(surname === '' || surname === undefined)
        response.status(400).render('error', {status : 400});
    else if(name !== '' || name !== undefined) response.json({id: 1, name:name, surname: surname, role: 'Student'});
    else response.json({id: 1, surname: surname, role: 'Student'});
});

//logout
accountApiRouter.get('/logout', async (request, response) => {
    const name = request.query.name;
    const surname = request.query.surname;
    if(surname === '' || surname === undefined)
        response.status(400).render('error', {status : 400});
    else if(name !== '' || name !== undefined) response.json({id: 1, name:name, surname: surname, role: 'Student'});
    else response.json({id: 1, surname: surname, role: 'Student'});
});
