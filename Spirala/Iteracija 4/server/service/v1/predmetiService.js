const fs = require("fs");
const path = require("path");

const CSVParser = require("./../../common/CSVParser");

class PredmetiService {
  static BrojPredmeta() {
    return this.DajSvePredmete().length;
  }

  static DajAktivnostiZaPredmet(predmet) {
    return CSVParser.CSV2JSON().filter((x) => x.naziv == predmet);
  }

  static DajPredmet(predmet) {
    return this.DajSvePredmete().filter((x) => x == predmet)[0];
  }

  static DodajPredmet(predmet) {
    fs.appendFileSync(path.resolve("./data/predmeti.csv"), (this.BrojPredmeta() == 0 ? "" : "\n") + predmet);
  }

  static ObrisiPredmet(predmet) {
    fs.writeFileSync(
      path.resolve("./data/predmeti.csv"),
      this.DajSvePredmete()
        .filter((x) => x != predmet)
        .join("\n")
    );
  }

  static DajSvePredmete() {
    return CSVParser.CSV2Array();
  }
}

module.exports = PredmetiService;
