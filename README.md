
# UMK Users

## Zawartość

- [UMK Users](#umk-users)
  - [Zawartość](#zawarto%c5%9b%c4%87)
  - [Cel projektu](#cel-projektu)
  - [Opis](#opis)
    - [Wykorzystane metody API](#wykorzystane-metody-api)
  - [Wymagania](#wymagania)
  - [Użycie](#u%c5%bcycie)
    - [Serwer](#serwer)
    - [Klient](#klient)

## Cel projektu

Zbudowanie aplikacji przetwarzającej dane uzyskane poprzez USOS API na potrzeby społeczności akademickiej UMK. Aplikacja składa się z implementacji serwera oraz klienta. Użytkownik korzysta z aplikacji poprzez stronę HTML. Tam wprowadza dane, które są przetwarzane na serwerze, a następnie wynik jest prezentowany w atrakcyjnej formie użytkownikowi. Zestaw dostępnych metod znajduje się na stronie [USOSapi](https://usosapps.umk.pl/developers/api/)

## Opis

UMK Users to proste narzędzie do wyszukiwania użytkowników USOS w czytelnej formie:

- Wyszukiwanie użytkowników "publicznych" bez szczegółów (dostęp bez zalogowania)
- Wyszukiwanie użytkowników wraz ze szczegółami (tylko zalogowany student/pracownik)

### Wykorzystane metody API

| Metoda | Cel użycia |
|------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| [services/users/search2](https://usosapps.umk.pl/developers/api/services/users/#search2) | Wyszukuje użytkowników (imię, nazwisko oraz identyfikator USOS) |
| [/services/users/user](https://usosapps.umk.pl/developers/api//services/users/#user) | Wyszukuje szczegółowe dane użytkowników wg identyfikatora USOS  |
| [services/oauth/access_token](https://usosapps.umk.pl/developers/api/services/oauth/#access_token) | Logowanie - wymień request token na access token |
| [services/oauth/authorize](https://usosapps.umk.pl/developers/api/services/oauth/#authorize) | Logowanie - autoryzacja aplikacji przez użytkownika |
| [services/oauth/request_token](https://usosapps.umk.pl/developers/api/services/oauth/#request_token) | Logowanie - uzyskaj request token |
| [services/oauth/revoke_token](https://usosapps.umk.pl/developers/api/services/oauth/#revoke_token) | Wylogowywanie użytkownika |

## Wymagania

Aplikacja korzysta z [Node.js](https://nodejs.org/) oraz następujących technologii:

- fontawesome dla ikon
- bulma jako framework css 
- express jako serwer aplikacji działającym na środowisku node.js
- express-session jako komponent serwera pozwalający na rozróżnianie klientów i przechowywania pozyskanych przez nich tokenów z Oauth1.0a.
- file-loader w celu umożliwienia załadowania plików przez webpack-a
- got, zamiennik dla request(), odpowiedzialny za wysyłanie zapytań GET oraz POST,
- ip, w celu pozyskania adresu IP serwera, tak by przekierowanie `callback` działało uniwersalnie (nie tylko localhost)
- oauth-1.0a, biblioteka znacząco ułatwiająca wypełnianie niezbędnych pól dla Oauth1.0a
- pug, serwerowy silnik renderowania stron html
- vue, framework open-source JavaScript do budowania interfejsów użytkownika i aplikacji typu single-page
- webpack wraz zniezbędnymy "loaderami" w celu zbudowania tak zwanego pliku `bundle` używanego w trakcie działania aplikacji klienckiej
- do styli użyto sass ze względu na możliwość definiowania zmiennych oraz czytelniejszą strukturę od standardowego css

## Użycie

### Serwer

Zainstaluj zależności projektu:

```sh
npm install
```

Podaj klucz API uzyskany z [USOSapps Developer](https://usosapps.umk.pl/developers/). W katalogu z projektem utwórz plik *apiKeys.json* z następującą zawartością:

```json
{
  "name": "usos",
  "consumerKey": "xxxxxxxxxxxxxxxxxxxxxxxx",
  "consumerSecret": "yyyyyyyyyyyyyyyyyyyyyyy",
  "appName": "psddddddddddddddddsd"
}
```

W celu uruchomienia projektu należy wykonać polecenie `npm install` a następnie `node index.mjs`.
W celu pracy developerskiej przy projekcie należy dodatkowo zainstalować webpacka globalnie oraz używać skryptów `build` bądź `start`.

### Klient

Klient przeglądarki dostępny jest pod [https://twojeip:3000/](https://twojeip:3000/). W konsoli serwera otrzymasz stosowny link z dostępną usługą.
Warto wspomnieć, że aby zainicjować wyszukiwanie użytkownika należy kliknąć w przycisk `Szukaj` bądź nacisnąć klawisz `Enter` po wpisaniu frazy.
![Wyszukiwarka](images/wyszukiwarka.jpg?raw=true "Wyszukiwarka")
Rezultaty wyszukiwania prezentują się następująco:
![Wyszukiwarka](images/wyniki.jpg?raw=true "Wyniki")
Ponadto jeśli użytkownik przypadkowo znajdzie się pod niewłaściwym adresem www na serwisie ujrzy czytelny komunikat:
![Zagubiony](images/zagubiony.jpg?raw=true "Zagubiony użytkownik")
