# 📖 React Pokedex

Dit is een interactieve Pokedex-applicatie gebouwd met React. De applicatie biedt gebruikers de mogelijkheid om alle beschikbare Pokémon te bekijken en te sorteren op verschillende criteria, zoals nummer en naam. Gebruikers kunnen ook filteren op type en generatie, evenals gebruik maken van een zoekbalk om specifieke Pokémon te vinden.

## 🌟 Functies

- **Bekijk alle Pokémon**: Blader door een volledige lijst van alle Pokémon.
- **Sorteren**: Sorteer Pokémon op:
  - Stijgend nummer (nummer oplopend)
  - Dalend nummer (nummer aflopend)
  - Willekeurig (random)
  - Naam oplopend (A-Z)
  - Naam aflopend (Z-A)
- **Filteren**: Filter Pokémon op:
  - Type (bijv. Water, Vuur, Gras, etc.)
  - Generatie (bijv. Gen 1, Gen 2, etc.)
- **Zoekbalk**: Zoek naar specifieke Pokémon op naam.
- **Pokémon Details Pagina**: Klik op een Pokémon om gedetailleerde informatie over die specifieke Pokémon te bekijken, zoals zijn type, statistieken en evoluties.
- **Favorieten functionaliteit**: Gebruikers kunnen favorieten Pokémon opslaan en ophalen. De data wordt opgeslagen in de Local Storage.

## 📦 Installatie

Volg de onderstaande stappen om het project lokaal op te zetten:

1. **Clone de repository**:
    ```bash
    git clone https://github.com/sendrastisch/react-pokedex.git
    ```

2. **Navigeer naar de projectmap**:
    ```bash
    cd pokedex-react-app
    ```

3. **Installeer de benodigde dependencies**:
    ```bash
    npm install
    ```

4. **Start de applicatie**:
    ```bash
    npm run dev
    ```

De applicatie wordt standaard gestart op [http://localhost:5173](http://localhost:5173).

## 🖥️ Gebruik

1. **Blader door de lijst van Pokémon** om alle beschikbare karakters te bekijken.
2. **Gebruik de sorteermogelijkheden** om de volgorde van de Pokémon-lijst aan te passen op basis van jouw voorkeuren.
3. **Gebruik de filteropties** om de lijst te verfijnen op basis van het type of de generatie van de Pokémon.
4. **Gebruik de zoekbalk** om een specifieke Pokémon op naam te vinden.
5. **Klik op een Pokémon** om naar de details pagina te gaan en gedetailleerde informatie over de Pokémon te bekijken.
6. **Voeg Pokémon toe aan favorieten** om je favoriete Pokémon bij te houden en terug te zien.

## 🚀 Toekomstige verbeteringen en toevoegingen

- **Meertalige ondersteuning**: Voeg ondersteuning toe voor meerdere talen.
- **Zijbalk Filteropties**: Momenteel worden de filteropties weergegeven in de navigatiebalk, wat leidt tot CLS (Cumulative Layout Shift) op de detailpagina en beperkt gebruikers tot het selecteren van slechts één generatie/type tegelijk. Bovendien is het voor de gebruiker niet intuïtief om filteropties te deselecteren. Om deze problemen op te lossen, worden de filteropties verplaatst naar een zijbalk. In de zijbalk kunnen meerdere filteropties tegelijk geselecteerd worden, worden alle geselecteerde opties duidelijk weergegeven, en kan de gebruiker alle filters met één knop in één keer deselecteren.
- **Evolutionaire Keten op de Detailpagina**: Voeg de evolutieketen van Pokémon toe aan de detailpagina, zodat gebruikers eenvoudig de evoluties van een Pokémon kunnen bekijken zonder de pagina te verlaten.
- **Performance optimization**: Momenteel worden alle Pokémon in één keer opgehaald. Dit zorgt voor langere laadtijden dan nodig is. Met Lazy Loading kan worden gezorgd dat slechts de zichtbare Pokémon worden opgehaald. Zodra er gescrolld wordt, kunnen de andere opgehaald worden.
- **Responsive Design voor mobiel**: De huidige Pokédex is niet responsief voor mobiele apparaten. Er wordt gewerkt aan een mobiele versie, zodat de applicatie ook optimaal werkt op kleinere schermen.

## 📜 Licentie

Dit project is niet gelicenseerd voor gebruik door anderen. Het is alleen voor persoonlijke of interne gebruik. Geen enkele persoon of entiteit mag het project gebruiken, aanpassen, of distribueren zonder uitdrukkelijke toestemming.
