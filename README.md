# USOS
### Cel projektu
Zbudowanie aplikacji przetwarzającej dane uzyskane poprzez USOS API na potrzeby
społeczności akademickiej UMK. Aplikacja składa się z implementacji serwera oraz
klienta. Użytkownik korzysta z aplikacji poprzez stronę HTML. Tam wprowadza
dane, które są przetwarzane na serwerze, a następnie wynik jest prezentowany w
atrakcyjnej formie użytkownikowi. Rezultat działania my bać wynikiem złożenia
informacji z minimum dwóch różnych metod API np:
[search2](https://usosapps.umk.pl/services/users/search2) - wyszukiwanie
użytkownika USOS i na podstawie uzyskanego *id* szukamy informacji o
zatrudnieniu za pomocą metody:
[staff](https://usosapps.umk.pl/services/tt/staff). Zestaw dostępnych metod
znajduje się na stronie [USOSAPPS](https://usosapps.umk.pl/developers/api/)

### Autoryzacja
Metody są na różnym poziomie dostępu. Niektóre nie wymagają autoryzacji, ale
wasza aplikacja ma zaimplementowaną obsługę autoryzacji użytkownika. Przed
przystąpieniem do pracy wygenerujcie sobie [klucze do
API](https://usosapps.umk.pl/developers/). Model autoryzacji jest oparty na
protokole [OAuth 1.0a](https://usosapps.umk.pl/developers/api/authorization/)


### Szablon
Pliki z kodem, które mają pomóc zacząć budowanie aplikacji, są dostępne w
repozytorium.

### Rezultat projektu i ocenianie
Aplikacja, którą zbudujecie, ma być gotowym produktem. To znaczy, że zaspokaja
jakąś konkretną potrzebę społeczności akademickiej *UMK*, jest niezawodna oraz
atrakcyjna wizualnie. To jest projekt na ocenę, na którą składa się:
1. Definicja problemu: trafne zdefiniowanie użytkownika końcowego i jego potrzeb.
2. Rozwiązanie problemu: trafne rozwiązanie techniczne (pomysł na apkę,
   niezawodność i atrakcyjność wizualna)
3. Oryginalne rozwiązanie techniczne, w tym napisanie aplikacji w czystym
   Node.js. Im mniej zewnętrznych bibliotek tym lepiej. Rozwiązanie problemu
   autoryzacji, aby nie trzeba było naciskać na link. Rozwiązanie problemu
   autoryzacji, aby nie było oparte o bibliotekę *request*.
4. Systematyczność w pracy i terminowość. 
