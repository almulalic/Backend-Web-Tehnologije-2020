let assert = chai.assert;

// Napomena da je pretpostavljeno da hardkodirani primjeri zadovoljavaju uslove testnog slučaja

describe("Zadatak 1", function () {
  it("Test kada nema niti jednog predavanja (rezultat null)", function () {
    const html = primjeri[3]; // Primjer sigurno ne sadrzi predavanje
    assert.equal(GoogleMeet.dajZadnjePredavanje(html), null);
  });
  it("Test kada nema niti jedne vježbe (rezultat null)", function () {
    const html = primjeri[0]; // Primjer sigurno nema niti jednu vježbu
    assert.equal(GoogleMeet.dajZadnjuVjezbu(html), null);
  });
  it("Test kada je string prazan (rezultat null)", function () {
    const html = "";
    assert.equal(GoogleMeet.dajZadnjuVjezbu(html), null);
  });
  it("Test kada svaka druga sedmica ima vježbu (rezultat url vježbe iz posljednje sedmice)", function () {
    const html = primjeri[5]; // Primjer sigurno ima vježbe samo u parnim sedmicama, počevši od druge
    assert.equal(GoogleMeet.dajZadnjuVjezbu(html), "http://meet.google.com/link-osme-parne-sedmice");
  });
  it("Test kada imaju linkovi sa ispravnim nazivima ali url ne sadrži meet.google.com (null)", function () {
    const html = primjeri[5]; // Primjer sigurno ima predavanja, ali umjesto meet.google.com link je meets.google.com
    assert.equal(GoogleMeet.dajZadnjePredavanje(html), null);
  });
  it("Test kada postoje linkovi sa ispravnim url-om ali ne sadrže tekst ‘vjezb’,’vježb’ i ’predavanj’ (null)", function () {
    const html = primjeri[6]; // Primjer sigurno sadrži validne linkove, ali pogrešan tekst nazivu
    assert.equal(GoogleMeet.dajZadnjePredavanje(html), null);
  });
  it("Test kada se link nalazi van ul liste (validan rezultat iz posljednje sedmice isključujuću link koji je val liste)", function () {
    const html = primjeri[6]; // Primjer sigurno sadrži validne linkove, ali izvan section liste
    assert.equal(GoogleMeet.dajZadnjuVjezbu(html), null);
  });
  it("Test kada su predavanja i vježbe samo u prvoj sedmici (rezultat url vježbe iz prve sedmice i url predavanja iz prve sedmice)", function () {
    const html = primjeri[7]; // Primjer sigurno sadrži predavanja i vježbe u prvoj sedmici
    const predavanje = GoogleMeet.dajZadnjePredavanje(html);
    const vjezba = GoogleMeet.dajZadnjuVjezbu(html);

    assert.equal(
      predavanje + " " + vjezba,
      "http://meet.google.com/link-od-predavanja-zadnji http://meet.google.com/link-od-vjezbi-zadnji"
    );
  });
  it("Test kada nije validan html kod - kada ne sadrži div ‘course-content’ sa ul listom ‘weeks’ i elementima liste ‘section-*’.", function () {
    const html = primjeri[8]; // Primjer sigurno nije validan
    assert.equal(GoogleMeet.dajZadnjePredavanje(html), null);
  });
});
