/* Ustawienia sesji */
import session from "express-session";

export const sessionSettings = session({
    secret: Math.random().toString(36).substring(2),
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 7200000,
        secure: true,
        httpOnly: true
    }
});
