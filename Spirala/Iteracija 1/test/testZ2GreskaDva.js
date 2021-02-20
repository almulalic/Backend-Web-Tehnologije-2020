let assert = chai.assert;

// Napomena da je pretpostavljeno da hardkodirani primjeri zadovoljavaju uslove testnog slučaja

describe("Zadatak 2", function () {
  it("dajTrenutnuAktivnost kada nema trenutne aktivnosti u datom vremenu", function () {
    const raspored = new AnotherBadRaspored(rasporedi[0]);
    const datum = "09-11-2020T14:59:00";
    const grupa = "";

    assert.equal(raspored.dajTrenutnuAktivnost(datum, grupa), "Trenutno nema aktivnosti");
  });
  it("dajTrenutnuAktivnost na početku neke aktivnosti - sekund prije", function () {
    const raspored = new AnotherBadRaspored(rasporedi[0]);
    const datum = "09-11-2020T11:59:59";
    const grupa = "grupa1";

    assert.notEqual(raspored.dajTrenutnuAktivnost(datum, grupa), "BWT 0");
  });
  it("dajTrenutnuAktivnost na početku neke aktivnosti - tačno u sekundi", function () {
    const raspored = new AnotherBadRaspored(rasporedi[0]);
    const datum = "09-11-2020T12:00:00";
    const grupa = "grupa1";

    assert.equal(raspored.dajTrenutnuAktivnost(datum, grupa), "BWT 90");
  });
  it("dajTrenutnuAktivnost na kraju neke aktivnosti - tačno u sekundi", function () {
    const raspored = new AnotherBadRaspored(rasporedi[0]);
    const datum = "09-11-2020T13:30:00";
    const grupa = "grupa1";

    assert.equal(raspored.dajTrenutnuAktivnost(datum, grupa), "Trenutno nema aktivnosti");
  });
  it("dajTrenutnuAktivnost na kraju neke aktivnosti - sekund poslje", function () {
    const raspored = new AnotherBadRaspored(rasporedi[0]);
    const datum = "09-11-2020T13:30:01";
    const grupa = "grupa1";

    assert.equal(raspored.dajTrenutnuAktivnost(datum, grupa), "Trenutno nema aktivnosti");
  });
  it("dajTrenutnuAktivnost kada postoji vježba u datom vremenu ali nije ispravna grupa", function () {
    const raspored = new AnotherBadRaspored(rasporedi[0]);
    const datum = "09-11-2020T12:43:23";
    const grupa = "grupa2";

    assert.equal(raspored.dajTrenutnuAktivnost(datum, grupa), "Trenutno nema aktivnosti");
  });
  it("dajTrenutnuAktivnost kada postoji vježba u datom vremenu i ispravna je grupa", function () {
    const raspored = new AnotherBadRaspored(rasporedi[0]);
    const datum = "11-11-2020T13:06:18";
    const grupa = "grupa2";

    assert.equal(raspored.dajTrenutnuAktivnost(datum, grupa), "MUR1 54");
  });
  it("dajPrethodnuAktivnost za slučaj kada je prva prethodna aktivnost vježba sa pogrešnom grupom, tada trebate vratiti aktivnost prije nje", function () {
    const raspored = new AnotherBadRaspored(rasporedi[0]);
    const datum = "12-11-2020T19:34:55";
    const grupa = "grupa1";

    assert.equal(raspored.dajPrethodnuAktivnost(datum, grupa), "SP");
  });
  it("dajPrethodnuAktivnost prije prve aktivnosti u ponedjeljak, treba vratiti posljednju aktivnost iz petka, ili četvrtka ako nema aktivnosti u petak itd", function () {
    const raspored = new AnotherBadRaspored(rasporedi[0]);
    const datum = "14-11-2020T21:00:00";
    const grupa = "grupa2";

    assert.equal(raspored.dajPrethodnuAktivnost(datum, grupa), "SP");
  });
  it("dajSljedecuAktivnost za slučaj kada je prva sljedeća aktivnost vježba sa pogrešnom grupom, tada trebate vratiti aktivnost poslije nje ili ako je nastava gotova da nema više aktivnosti", function () {
    const raspored = new AnotherBadRaspored(rasporedi[0]);
    const datum = "12-11-2020T17:55:42";
    const grupa = "grupa1";

    assert.equal(raspored.dajSljedecuAktivnost(datum, grupa), "SP 95");
  });
  it("dajSljedecuAktivnost poslje zadnje aktivnosti u petak u slučaju da je nastava je gotova za danas", function () {
    const raspored = new AnotherBadRaspored(rasporedi[0]);
    const datum = "13-11-2020T20:00:01";
    const grupa = "";

    assert.equal(raspored.dajSljedecuAktivnost(datum, grupa), "Nastava je gotova za danas");
  });
});
