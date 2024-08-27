## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

# Gameart-frontend

**Tim: Eva Pelko <br />**

[Fakultet informatike u Puli](https://fipu.unipu.hr/) <br />
Kolegij: [Web Aplikacije](https://fiputreca.notion.site/fiputreca/Web-aplikacije-7ba8350d498546a78812399024edac44) <br />
Mentor: [doc.dr.sc. Nikola Tanković](https://www.notion.so/Kontakt-stranica-875574d1b92248b1a8e90dae52cd29a9) <br />

Ovaj repozitorij je nastavak od [projekta za Programsko Inženjerstvo.](https://github.com/EvaPelko/learnart)<br />
Link na [Backend](https://github.com/EvaPelko/Gameart-backend).<br />

## Opis

Grupa korisnika: svi ljubitelji umjetnosti i ljudi koji žele naučiti crtati<br />
Ideja: Društvena mreža za umjetnike bazirana na edukaciji.<br />

### Sljedeće funkcionalnost sam uspješno implementirala u PI-u:

U login page-u možete odabrati jeste li učenik ili učitelj. Korisnici mogu odabrati nickname, te će dobiti posebnu ikonu pokraj imena ako su učitelj. Učitelji imaju posebnu sekciju u kojoj samo učitelji mogu objavljivati svoje materijale (youtube link, step by step tutorijali, informativni tekstovi), dok studenti također imaju svoju sekciju gdje samo oni mogu objavljivati.<br />
Društvena mreža je podijeljena na dvije sekcije: edukacijski dio i učenički dio. Edukacijski dio je namijenjen učiteljima. Učitelji i učenici mogu komentirati sve postove. <br />

### Sljedeće funkcionalnosti su nadogradnja i poboljšanje u sklopu kolegija Web aplikacije:

- **Prijenos baze podataka s Firebase u MongoDB.** Prijenos baze podataka s Firebasea na MongoDB omogućio je veću fleksibilnost u modeliranju podataka, bolju skalabilnost i naprednije mogućnosti upita, čime se unaprijedila ukupna funkcionalnost i učinkovitost web aplikacije. Također, migracija je pružila veću kontrolu nad podacima i omogućila ekonomičnija rješenja za skaliranje. <br />
- **Pretraživanje.** Dodatak funkcionalnosti pretraživanja omogućuje korisnicima brže i jednostavnije pronalaženje specifičnih sadržaja ili korisnika unutar aplikacije, čime se poboljšava korisničko iskustvo i efikasnost korištenja. Ova značajka također pomaže u organizaciji i dostupnosti informacija, što aplikaciju čini korisnijom i intuitivnijom. <br />
- **Unapređenje profila korisnika.** Nova verzija aplikacije omogućila je pregled svih objava od određenog korisnika na njihovom profilu. <br />
- **Brisanje vlastitih objava.** Korisnik na vlastitom profilu ima pregled svojih objava i mogućnost brisanja neželjenog sadržaja. <br />
- **Označavanje objava sa “sviđa mi se”.** Nova funkcionalnost povećava interaktivnost korisnika i omogućuje izražavanje mišljenja. Također pruža autorima povratnu informaciju o popularnosti njihovih objava. Ova funkcionalnost također potiče angažman i stvara osjećaj zajednice među korisnicima. <br />
- **Prijava neprikladnih sadržaja.** Prijava neprikladnih sadržaja poboljšava web aplikaciju osiguravanjem sigurnog i prikladnog okruženja za sve korisnike, omogućujući brže uklanjanje štetnih ili neprimjerenih objava te time održavajući integritet i povjerenje unutar zajednice. <br />

Dodatne moguće funkcionalnosti:<br />

- Svaki korisnik ima profil u kojem se može odabrati opcija za follow koja obavijesti followere kada taj korisnik nešto objavi. <br />
- Ekspanzija teacher feed-a u različite dijelove koji su tematski relevantni, npr. sekcija za početnike, sekcija za anatomiju, za slikanje, itd...<br />
- Napredna search funkcija u kojoj možete specificirati koju sekciju zelite pretražiti i razinu iskustva, te ključne riječi.<br />
- Chat i privatne poruke: korisnici imaju mogućnost za komunikaciju putem privatnih poruka i chatova. <br />
- Mogućnost organiziranja virtualnih radionica i webinara. Učiteljima je omogućeno da interaktivno podučavaju korisnike uživo, koristeći video streaming i interakciju u stvarnom vremenu.<br />
- Kalendar koji prikazuje raspored webinara, radionica, tečajeva i drugih događanja. To bi olakšalo korisnicima da prate i planiraju svoje aktivnosti.<br />
- Mogućnost korisnicima da ostavljaju recenzije na profil učitelja.<br />
- Sustav nagrada ili značka za aktivne korisnike koji sudjeluju u zajednici, ostavljaju komentare, lajkaju sadržaje i doprinose edukacijskim resursima.<br />

## Link na javni prototip
https://gameart-frontend.netlify.app/
