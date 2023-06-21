# Project ARC

dit is een applicatie geschreven in next.js voor het vak webapplicaties 2.

in deze applicatie zijn gebruikt gemaakt van de volgende frameworks/modules
- next.js
  - nextauth
- aws cognito
- google maps

een werkend voorbeeld is te vinden op https://project-webapplicaties-2.vercel.app/ met de volgende inloggegevens
```
username: demo
passwrod: DemoPassword
```


## .env
voor het runnen van deze zijn een aantal env variablen nodig.
er is een voorbeeld bestant met een aantal variablen ingevuld. dit is `example.env.local` deze moet vernoemd worden naar `.env.local` en ingevuld worden. 
hiervan moet minimaal de aws coginito tokens ingevuld zijn. de google maps tokens zijn niet verplicht voor het functioneren van de kaart.


## auth uitzetten
om de applicatie zonder authenticatie te kunnen runnen moeten er een aantal aanpassingen gedaan worden
- `src/middleware.ts` hernoemen naar een andere naam. je kunt hem niet hernoemen naar `_middleware.ts`
- lijn 76 in `src/pages/dashboard.tsx` en lijn 21 in  `src/componnets/Navbar/navbar.tsx` vervangen met de volgende code 

```ts
 const session = {
        data: {
        user: {
            name: "",
            image: ""
        }
    },
    status: "authenticated",
};
``` 

als deze stappen zijn gemaakt dan wordt de authenticatie niet meer gebruikt en kan je de applicatie opstarten zonder de aws cognito variablen. als dit gedaan is dan moet je wel handmatig navigeren naar de `/dashboard` pagina. de inlogknop werkt dan namelijk niet.

## installatie
deze applicatie wordt gerunned op node js. als je nodejs nog niet geinstaleerd hebt moet je dit eerst installeren. 

als dit gedaan is dan moet je door legacy dependencies van sommige packages een flag toeveogen aan het install commando. dit wordt dan als volgt:
```
npm install --legacy-peer-deps
```

als je dit commando uitvoord dan worden als het goed is alle depenecies geinstalleerd

## starten
als de aplpicatie geinstalleerd is en de env variablen zijn ingesteld en mogelijk auth is uitgeschakeld dan kan je de applicatie opstraten dit kan je doen doormiddel van het volgende commando.

```
npm run dev
```

als dit commando uitgevoerd is dan is enkele momentel later op `http://localhost:3000` de applicatie beschikbaar.