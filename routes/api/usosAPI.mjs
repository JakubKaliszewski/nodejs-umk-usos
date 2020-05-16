import express from 'express';
import {sessionSettings} from "../../sessionSettings.mjs";
import usosCommunication from "../../usosCommunication/usosCommunication.mjs";
import UsosUserResponse from "../../usosCommunication/usosUserResponse.mjs";

export const usosApiRouter = express.Router();

usosApiRouter.use(sessionSettings);

//Get user
usosApiRouter.get('/user', async (request, response) => {
    let query, token;
    const access_token = request.session.oauth_access_token
    const access_token_secret = request.session.oauth_secret_token;

    if (access_token === undefined || access_token_secret === undefined) {
        token = null;
    } else {
        token = {
            key: access_token,
            secret: access_token_secret
        };
    }

    const name = request.query.name;
    const surname = request.query.surname;
    if (surname === '' || surname === undefined)
        response.status(400).render('error', {status: 400});

    if (name !== undefined)
        query = `${name} ${surname}`;
    else query = surname;
    const responseUsers = await usosCommunication.searchUser(query, token);
    let users = [];
    responseUsers.items.forEach((user) => {
        let cleanUser = cleanTextFromTags(user.match);
        user.match = cleanUser;
        users.push({name: user.match, id: user.user.id, about: false});
    })

    //pozyskujemy dodatkowe informacje
    if (token !== null){
        let usersWithDetails = [];
        for (const user of users) {
            let userDetails = await usosCommunication.searchUserDetails(user.id, token);
            let preparedUser = new UsosUserResponse(user, userDetails);
            usersWithDetails.push(preparedUser);
        }
        response.json(usersWithDetails);
    }else response.json(users);
});

//Get staff by userId
usosApiRouter.get('/staff', async (request, response) => {
    const userId = request.query.userId;
    if (userId === '' || userId === undefined)
        response.status(400).render('error', {status: 400});
    else response.send(userId);
});

function cleanTextFromTags(text) {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
}
