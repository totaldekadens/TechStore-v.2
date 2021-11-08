# TechStore
Grupprojekt

Vi har fått ett uppdrag där vi skall bygga en hemsida för ett nystartat företag som säljer teknikprylar. Företaget heter TechStore och har bett oss om hjälp för att bygga deras e-handelssida.


G-krav:

Navigationsbar:

*	Klart:
      * Hemsidan skall innehålla en fixerad navigationsbar längst upp på sidan som går hela vägen från vänster till höger.
      *	Till vänster i navigationsbaren skall det finnas en titel (TechStore) som skall vara klickbar, ett klick på titeln tar användaren till startsidan.
      *	Till höger i navigationsbaren skall det finnas en kundvagnsknapp som skall vara klickbar, ett klick på knappen tar användaren till kundvagnssidan.
      *	När en produkt läggs till i kundvagnen skall detta reflekteras med att det visas en siffra intill kundvagnsknappen som reflekterar antalet produkter i kundvagnen.

*	Tillagt utöver G-kravspec:
      *	Lagt till en ”Mina sidor”-ikon. Om man trycker på den så kommer man in till inloggningssidan.

Startsida:

*    Klart:
     * Startsidan skall lista produkterna som finns i products.json filen.
     * Varje presentationsyta för produkterna skall ta upp ungefär hela höjden av skärmen och presentera all produktinformation.
     * Det skall även, för varje produkt, finnas en knapp för att lägga till produkterna i kundvagnen.
     * Produkterna som har lags till i kundvagnen skall sparas i localStorage så det är möjligt att komma åt informationen från alla sidor.

Kundvagnssida:

*	Klart:
      *	Kundvagnssidan skall lista produkterna som användaren har lagt till i kundvagnen.
      *	Listan skall vara horizontell och centrerad.
      *	Det ska gå att se flera produkter utan att behöva skrolla på sidan.
      *	Varje produkt i listan skall visa bilden, titeln, priset och en knapp för att ta bort produkten ur kundvagnen.
      *	Nedanför listan skall det finnas ett totalbelopp samt en knapp för att slutföra köpet.
      *	Knappen för att slutföra köpet skall, vid klickning, visa en bekräftelse på köpet i en pop-up. 

Övrigt: 

*	Klart:
      *	Hemsidan skall vara responsiv, dvs den skall gå att öppna på en mobil, en surfplatta och en datorskärm.
      *	Hemsidan skall efterlikna bilderna som finns i mockup-mappen (inklusive samtliga färger, font-typ, textstorlek osv).

GIT:

*	Klart:
      *	Ni skall jobba enligt GIT-Flow.
      *	Alla ändringar i koden skall gå igenom en Pull-Request in i er default-branch (main/master).
      *	Er default branch skall vara låst så ni ej kan pusha direkt till den branchen, detta sätts med en regel i Github.


VG-krav: 

*	Klart:
      *	Utöka produktlistan med ett urval från årets modeller så det totalt finns 10 stycken telefoner.
      *	När man bekräftar ett köp skall kundvagnen tömmas.
      *	Skapa en loginsida där det är möjligt att skapa ett konto samt logga in och se alla beställningarna som har gjorts. Här är design och funktionaliteten frivillig men             det skall finnas en motivation kring vilka besluts som har tagits och varför i er readme fil. Använd localStorage för att spara nya användare samt gjorda                         beställningar.

* Motivation mina sidor: 
     *    Vi har valt att designa ”mina sidor” samt formuläret utifrån hur de andra sidorna är designade. Vi vill att det ska vara enhetligt var du än befinner dig på webbsidan           och har därför valt att använda samma typsnitt samt färgerna svart och vitt. Knappen ”logga in” och ”skapa konto” har vi valt i färgen grön för att det ska                       vara tydligt för användaren var den ska klicka på, vi har även hovrat knappen i en mörkare grön och använt oss av en ”cursor pointer” för att göra det ännu tydligare.           Vi har valt att designa ett enkelt och tydligt formulär för att användaren vet vad hen behöver göra för att aningen skapa konto eller logga in.
     *    Den funktion vi har tagit hänsyn till är att man framförallt inte skall kunna skapa flera konton med samma användarnamn och att man måste ha ett visst antal tecken.             Man får en tydlig alert om det är något du behöver komplettera, samt får ett tydligt meddelande om du lyckas med inloggningen eller skapandet av kontot.                         Beställningar som är sparade på användaren döljs via en länk för att inte ta för stor plats då historik kan skilja sig en hel del. 

Ambition: 
VG om tid finns

Länk till hemsida:
https://totaldekadens.github.io/TechStore/index.html

Länk till repo:
https://github.com/totaldekadens/TechStore
