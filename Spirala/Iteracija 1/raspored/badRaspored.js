class Datum {
  dayAlias = ["nedelja", "ponedjeljak", "utorak", "srijeda", "cetvrtak", "petak", "subota"];

  constructor(dateTime) {
    const [datum, vrijeme] = dateTime.split("T");
    const [dan, mjesec, godina] = datum.split("-");
    const [sati, minute, sekunde] = vrijeme.split(":");

    this.JSDatum = new Date(+godina, +mjesec - 1, +dan, +sati, +minute, +sekunde, 0);
    this.weekDayOffset = this.JSDatum.getDay();
  }

  dajJSDatum() {
    return this.JSDatum;
  }

  dajDanUSedmici(offset = 0) {
    return this.dayAlias[this.weekDayOffset - offset];
  }

  dajDatum() {
    return this.JSDatum.getDate();
  }

  dajVrijeme() {
    return this.JSDatum.getTime();
  }

  konvertujUTrenutniDatum(dateString) {
    const [sati, minute] = dateString.split(":");

    const vrijeme = new Date(this.dajJSDatum().getTime());
    vrijeme.setHours(+sati);
    vrijeme.setMinutes(+minute);

    return vrijeme;
  }

  pripadaIntervalu(start, end) {
    return (
      +this.dajJSDatum() >= +this.konvertujUTrenutniDatum(start) &&
      +this.dajJSDatum() < +this.konvertujUTrenutniDatum(end)
    );
  }

  dajRazlikuUMinutamaOd(end) {
    return Math.floor(Math.abs(+this.konvertujUTrenutniDatum(end) - this.dajJSDatum()) / 1000 / 60);
  }

  jePrijeVremena(end) {
    return +this.konvertujUTrenutniDatum(end) < this.dajJSDatum();
  }

  jePosljeVremena(end) {
    return +this.konvertujUTrenutniDatum(end) > this.dajJSDatum();
  }
}

class Predmet {
  constructor(csvPredmet) {
    const [naziv, grupa] = csvPredmet[0].split("-");
    const [startSati, startMinute] = csvPredmet[3].split(":");
    const [endSati, endMinute] = csvPredmet[4].split(":");

    const dayIndexMap = new Map([
      ["nedelja", 0],
      ["ponedjeljak", 1],
      ["utorak", 2],
      ["srijeda", 3],
      ["cetvrtak", 4],
      ["petak", 5],
      ["subota", 6],
    ]);

    this.naziv = naziv.trim();
    this.grupa = grupa ? grupa.trim() : null;
    this.aktivnost = csvPredmet[1].trim();
    this.dan = csvPredmet[2].trim();
    this.start = csvPredmet[3].trim();
    this.end = csvPredmet[4].trim();
    this.danIndex = dayIndexMap.get(this.dan);
    this.startSati = +startSati;
    this.startMinute = +startMinute;
    this.endSati = +endSati;
    this.endMinute = +endMinute;
  }
}

class BadRaspored {
  static dateFormat = "DD-MM-YYYYTHH:mm:ss";
  raspored = [];

  constructor(csvInput) {
    if (csvInput && csvInput.length !== 0) {
      const rows = csvInput.trim().split("\n");
      rows.forEach((row) => {
        this.raspored.push(new Predmet(row.split(",")));
      });
    }
  }

  dajTrenutnuAktivnost(dateTime, grupa) {
    if (dateTime.length === 0) return "Trenutno nema aktivnosti";

    const datum = new Datum(dateTime);

    let trenutniDogadjaji = [];

    this.raspored.forEach((dogadjaj) => {
      if (
        dogadjaj.dan == datum.dajDanUSedmici() &&
        (dogadjaj.aktivnost === "predavanje" || (grupa && dogadjaj.grupa === grupa.trim())) &&
        datum.pripadaIntervalu(dogadjaj.start, dogadjaj.end)
      )
        trenutniDogadjaji.push(dogadjaj);
    });

    if (trenutniDogadjaji.length === 0) return "Trenutno nema aktivnosti";

    return trenutniDogadjaji[0].naziv + " " + datum.dajRazlikuUMinutamaOd(trenutniDogadjaji[0].end);
  }

  dajSljedecuAktivnost(dateTime, grupa) {
    if (dateTime.length === 0) return "Trenutno nema aktivnosti";

    const datum = new Datum(dateTime);

    let trenutniDogadjaji = [];

    this.raspored.forEach((dogadjaj) => {
      if (
        (dogadjaj.aktivnost === "predavanje" || (grupa && dogadjaj.grupa === grupa.trim())) &&
        datum.jePosljeVremena(dogadjaj.start)
      )
        trenutniDogadjaji.push(dogadjaj);
    });

    return trenutniDogadjaji[0].naziv + " " + datum.dajRazlikuUMinutamaOd(trenutniDogadjaji[0].start);
  }

  dajPrethodnuAktivnost(dateTime, grupa) {
    if (dateTime.length === 0) return "Trenutno nema aktivnosti";

    const datum = new Datum(dateTime);

    let trenutniDogadjaji = [];

    this.raspored.forEach((dogadjaj) => {
      if (
        (dogadjaj.aktivnost === "predavanje" || (grupa && dogadjaj.grupa === grupa.trim())) &&
        datum.jePrijeVremena(dogadjaj.end)
      )
        trenutniDogadjaji.push(dogadjaj);
    });

    if (trenutniDogadjaji.length === 0) return "Trenutno nema aktivnosti";

    return trenutniDogadjaji[trenutniDogadjaji.length - 1].naziv;
  }
}
