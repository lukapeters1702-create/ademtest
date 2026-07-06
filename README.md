# AdemRuimte, website

Statische website voor **AdemRuimte**, praktijk voor ademtherapie van Kim Peters (Venlo).
Geen build-stap nodig: het zijn losse HTML/CSS/JS-bestanden.

## Pagina's
`index.html` · `werkwijze.html` · `over-kim.html` · `praktisch.html` · `verwijzers.html` · `contact.html`

## Structuur
- `styles.css`, huisstijl (kleuren, typografie, componenten)
- `script.js`, navigatie, menu, popup, scroll-animaties, contactformulier
- `assets/img/`, logo, iconen en foto's
- `favicon.ico`, browser-icoon

## Lokaal bekijken
Open `index.html` in de browser, of draai een simpele server:

```bash
python3 -m http.server 8000
```

Ga daarna naar http://localhost:8000

## Online zetten (GitHub Pages)
Repo-instellingen → **Pages** → Source: **Deploy from a branch** → branch `main`, map `/ (root)`.
De site verschijnt op `https://<gebruikersnaam>.github.io/<repo>/`.

## Contactformulier
Werkt via de mailclient van de bezoeker (`mailto:` naar **ademruimte@ziggo.nl**).
Voor een echte formulier-inbox: vraag een gratis access key aan op
[web3forms.com](https://web3forms.com) met ademruimte@ziggo.nl en zet die in
`script.js` bij `WEB3FORMS_KEY`.

## Nog te doen (content)
- Definitieve tarieven, echte praktijkfoto's, echte reviews
- Telefoonnummer, KvK- en BIG-nummer
- Vector-/SVG-versie van het logo voor groot drukwerk
