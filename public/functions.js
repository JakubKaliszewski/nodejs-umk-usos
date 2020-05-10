//Przycisk logowania
const button = document.getElementById("login");
const hostname = window.location.host;

async function logInOut() {
    const urlFetch = new URL('https://' + hostname + '/api/account/login');
    const response = await fetch(urlFetch);
    const json = await response.json();
    window.location = json.url;
}
