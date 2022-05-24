# PAI_project - Spaniel VHS

W dzisiejszym świecie streamingów pewną luką są osoby z odtwarzami bluray i kinami domowymi, którzy chcą skorzystać ze swoich fizycznych sprzętów. Być może ktoś chce również użyć retro sprzętu, jak odtwarzacz VHS. Pomysłem na projekt jest implementacja klienta do rezerwowania filmów w wypożyczalni, tak by nieco zautomatyzować proces wypożyczania. Po wybraniu filmu, ten (zależnie od interpretacji) zostaje wysłany do klienta lub oczekuje na odbiór w sklepie. Za pomocą modyfikiacji bazy danych można zmienić dane filmów i stan ich wypożyczenia. Są też dostępne endpointy do zwracania filmów, domyślnie są stosowane jednak przez admina a aplikacja przygotowana jest dla klientów, więc adminom zostają jedynie endpointy i bezpośrednia modyfikacja bazy.

Użytkownik powinien mieć dostęp do
  - wylistowania filmów, które może wypożyczyć
  - wylistowania filmów, które obecnie są przez niego wypożyczone (dostępne po zalogowaniu)
  - zarezerowania filmu (dostępne po zalogowaniu)
  - zarejestrowania się
  - zalogowania się

Na bazę danych (umieszczoną po stronie backendu) składają się 2 tabele:
  - movies (zawierający informacje o filmie, jego dostępności i pole świadczące o tym, kto jest w jego posiadaniu)
  - users (loginy i hasła użytkowników)

Architektura aplikacji oparta jest o MVC i korzysta z REST. View napisany jest w react i jest po prostu pojedynczą aplikacją, bez przekierowań, wszystko odbywa się na jednej stronie i jednym widoku. Modelem możemy nazwać aplikację w node express, która przyjmuje RESTowe requesty z aplikacji Reactowej i zwraca wyniki w oparciu o bazę danych lub ją modyfikuje. 

Modele danych:
  - movie (pojedynczy film):
    - id (INTEGER)
    - title (TEXT)
    - description (TEXT)
    - available (INTEGER)
    - imageUrl (TEXT)
    - rating (REAL)
    - rentedTo (INTEGER)
    - returnDate (TEXT)
  
  - users
    - username
    - password

Endpointy do RESTowej komunikacji frontend - backend:
  - GET /movies do pobrania wszystkich filmów, które nie są przez nikogo wypożyczone z bazy danych  
  
![GET_movies_bitmap](https://user-images.githubusercontent.com/48535738/170116984-91151592-ed7a-4209-a1ea-508fd48c1cd7.png)

  - PATCH /movies, data: {id} do zarezerwowania jednego z dostępnych filmów o id przekazywanym w requeście 

![PATCH_movies](https://user-images.githubusercontent.com/48535738/170118784-85ad3150-84bb-4e86-86a4-f765f4142533.png)

  - PATCH /movies/returnAll do ustawienia wszystkich tytułów na dostępne (ustawienia daty zwrotu i rentedTo na NULL) (bez widoku, używany jedynie ręcznie)

![PATCH_returnAll](https://user-images.githubusercontent.com/48535738/170120451-8fcd9738-5a3b-41a6-95ee-df95f86d1d15.png)

  - PATCH /movies/return/:id do ustawienia tytułu o podanym id na dostępny (ustawienia daty zwrotu i rentedTo na NULL) (bez widoku, używany jedynie ręcznie)!

![PATCH_return_one](https://user-images.githubusercontent.com/48535738/170120549-49615abf-81ca-4130-9957-99919f68720e.png)
