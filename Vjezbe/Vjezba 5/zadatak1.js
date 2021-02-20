const expect = require("chai").expect;
const varijable = require("./varijable");

describe("Testiranje varijabli iz fajla varijable.js", () => {
  it("provjera da li je broj tipa broj", () => {
    expect(varijable.broj).to.be.a("number");
  });
  it("provjera da li broj ima vrijednost 20", () => {
    expect(varijable.broj).to.equal(20);
  });
  it("provjera da li je ", () => {
    expect(varijable.istina).to.equal(true);
  });
  it("provjera da li je rijec tipa string", () => {
    expect(varijable.rijec).to.be.a("string");
  });
  it("provjera da li rijec ima duzinu 5", () => {
    expect(varijable.rijec).to.have.lengthOf(5);
  });
  it("provjera da niz nije prazan", () => {
    expect(varijable.niz).to.not.be.empty;
  });
  it("provjera da li niz sadrzi clanove Sarajevo i Mostar", () => {
    expect(varijable.niz).to.contain("Sarajevo").and.to.contain("Mostar");
  });
  it("provjera da li niz ima duzinu barem 4", () => {
    expect(varijable.niz).to.have.length.greaterThan(3);
  });
  it("provjera da li varijabla objekat u sebi sadrzi niz knjige duzine 4", () => {
    expect(varijable.objekat.knjige).to.have.lengthOf(4);
  });
  it("provjera da li varijabla cijene unutar objekta sortiran niz", () => {
    varijable.objekat.cijene.sort((a, b) => {
      expect(b).to.be.lessThan(a);
    });
  });
});

// Tvrdnja expect([1,2,3]).to.equal([1,2,3]) pada jer je
// equal naredba striktnog poređenja, ili u JS ===
// sto znaci da poredi internu referencu objekta sa njim
// dok je eql oznacava deeplyEqual ili duboka jednakost
// sto znaci da svaki property mora biti identican ali
// da sami objekat ne mora biti isti tjst objekat mora
// biti duboka kopija
