//Przycisk logowania
const button = document.getElementById("login");
const hostname = window.location.host;

async function logInOut() {
    const currentStatus = button.text !== "Zaloguj się";
    const urlFetch = new URL('https://' + hostname + '/api/account/login');
    const response = await fetch(urlFetch);
    const json = await response.json();
    if(currentStatus) {
        window.open(json.url);
        location.reload();
    }else window.location = json.url;
}
