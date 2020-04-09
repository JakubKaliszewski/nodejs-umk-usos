/*Komunikacja z API usosa, pozyskanie danych z ich serwerów. Nic więcej.
Metody:
https://usosapps.umk.pl/developers/api/services/users/#search2
https://usosapps.umk.pl/developers/api/services/tt/#staff

Autoryzacja
Metoda OAuth 1.0a
Metoda na wczytanie kluczy pozyskanych - znajdują się w pliku

Testy można zrealizować w Mocha
*/

import fileOperation from "./fileOperation";
import * as http from "node/https";

export default class UsosAPI{
    static apiKeysFile = "apiKeys.json";
    static keys = null;

    static async loadKeys(){
        if (this.keys === null)
            this.keys = await fileOperation.readFile(this.apiKeysFile)
    }

    static async searchUser(query){
        //todo
    }

    static async getUserStaffById(userId){
        //todo
        //do wykonania zapytań
        const req = http.request({
            host: '127.0.0.1',
            port: 8080,
            method: 'POST'
        }, (res) => {
            res.resume();
            res.on('end', () => {
                if (!res.complete)
                    console.error(
                        'The connection was terminated while the message was still being sent');
            });
        });

    }
}
