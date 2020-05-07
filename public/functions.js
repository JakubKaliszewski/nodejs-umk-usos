const key = 'umk';
//Currently, Access Tokens expire after two hours OR after user logs out. -> USOS API DOC
const expiry = 72000000;
//Przycisk logowania
const button = document.getElementById("login");
const hostname = window.location.host;

loginButtonText();

async function logIn() {
    console.log("Logujemy się!");
    const value = getWithExpiry(key);
    if (value === null){
        console.log("Pozyskamy token!");
        //get na authorize
        //dostajemy url
        const urlFetch = new URL('http://' + hostname + '/api/account/login');
        const response = await fetch(urlFetch);
        const json = await response.json();
        window.location = json.url;
        //przekierowało do logowania
    } else if(button.value === "Wyloguj się"){
        localStorage.removeItem(key);
        console.log("Usunięto token!");
    }
}

function loginButtonText() {
    const value = getWithExpiry(key);
    if(value === null)
        button.value="Zaloguj się";
    else button.value="Wyloguj się";
}

function setWithExpiry(key, value) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + expiry
    }
    localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() >= item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}
