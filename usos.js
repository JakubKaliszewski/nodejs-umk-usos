const express = require('express');
const bodyParser = require('body-parser');
const {getFun1,getFun2,getFun3} = require('./gedata.js');
const {login} = require('./login.js');

const PORT = process.env.PORT || 3000;
const app = express();

// Umozliwia modyfikowanie html od strony serwerowej w trakcie działania programu 
// https://github.com/expressjs/express/wiki#template-engines
// https://expressjs.com/en/guide/using-template-engines.html
app.set('view engine', 'TEMPLATEENGINE');

// Statyczna strona
app.use(express.static(__dirname + '/public'));

// Wspracie dla obsługi danych w formacie JSON
app.use(bodyParser.json());
// Wspracie dla obłsugi danych przesyłanych przez formularz
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/login', (req, res) => {
    //instrukcja
});

app.post('/', (req, res) => {
    //instrukcja
});

app.use((req, res, next) => {
// Obsługa logów zapisywanych do pliku
// np: `${time}: ${req.method}: ${req.url} \n`;
});
	
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

