const fs = require("fs");
const path = require("path");

const CSVParser = require("./../common/CSVParser");
const { DanAlias, AktivnostAlias, jeValidnoVrijeme, jeValidanInterval } = require("../common/shared");

class RasporedService {
  static parametri = ["naziv", "aktivnost", "dan", "pocetak", "kraj"];

  static BrojAktivnosti() {
    let data = fs
      .readFileSync(path.resolve("./data/raspored.csv"), { encoding: "utf8", flag: "r" })
      .split("\n");

    return data == "" ? 0 : data.length;
  }

  static ValidirajFormu(body) {
    if (!body.naziv) throw Error("Polje 'naziv' nije pronadjeno u formi ili je prazno.");
    else if (!body.aktivnost) throw Error("Polje 'aktivnost' nije pronadjeno u formi ili je prazno.");
    else if (!body.dan) throw Error("Polje 'dan' nije pronadjeno u formi ili je prazno.");
    else if (!body.pocetak) throw Error("Polje 'pocetak' nije pronadjeno u formi ili je prazno.");
    else if (!body.kraj) throw Error("Polje 'kraj' nije pronadjeno u formi ili je prazno.");

    if (Object.values(body).length > 5)
      // Ovim se postize da se sprijeci da neko u novu kolonu unese csv i simulira SQL injection (u nekoj mjeri opet je moguce)
      throw Error(
        "U formi se nalazi više polja od predviđenog. Trenutno je podržano parsiranje polja: 'naziv','aktivnost','dan','pocetak','kraj'"
      );
    if (AktivnostAlias.get(body.aktivnost.toLowerCase()) === undefined)
      throw Error(
        "Polje 'aktivnost' ne sadrži validanu aktivnost, validne aktivnosti su: 'predavanje','predavanja','vježbe','vjezbe"
      );
    else if (DanAlias.get(body.dan) === undefined)
      throw Error(
        "Polje 'dan' ne sadrži validan dan, validni dani su: '(pon)edeljak','(uto)rak','(sri)jeda','(cet)vrtak','(pet)ak' "
      );
    else if (!jeValidnoVrijeme(body.pocetak))
      throw Error(
        "Polje 'Vrijeme Pocetka' nije validno. Podržani format je HH:MM, sati se predstavljaju u 24-satnom formatu."
      );
    else if (!jeValidnoVrijeme(body.kraj))
      throw Error(
        "Polje 'Vrijeme Kraja' nije validno. Podržani format je HH:MM, sati se predstavljaju u 24-satnom formatu."
      );
    else if (!jeValidanInterval(body.pocetak, body.kraj))
      throw Error(
        "Vrijeme trajanja aktivnosti nije validno. 'vrijemePocetka' mora biti prije vremena 'kraj'"
      );

    return true;
  }

  static DodajNovuAktivnost(body) {
    fs.appendFileSync(
      path.resolve("./data/raspored.csv"),
      (this.BrojAktivnosti() == 0 ? "" : "\n") + Object.values(body).join(",")
    );
  }

  static Sort(scope, ord, attr) {
    return scope.sort((a, b) => {
      if (attr == "dan") {
        a = DanAlias.get(a["dan"]).toString();
        b = DanAlias.get(b["dan"]).toString();
      } else {
        a = a[attr];
        b = b[attr];
      }

      return ord === "A" ? a.localeCompare(b) : b.localeCompare(a);
    });
  }

  static DajAktivnosti(dan, attr, ord, acceptHeader) {
    if (dan && !DanAlias.get(dan.toLowerCase())) throw Error("Dan nije validan");

    let raspored = CSVParser.CSV2JSON();

    let scope = dan
      ? raspored.filter((x) => {
          return DanAlias.get(x.dan) == DanAlias.get(dan);
        })
      : raspored;

    if (this.parametri.includes(attr.toLowerCase())) scope = this.Sort(scope, ord, attr.toLowerCase());

    return acceptHeader == "text/csv" ? CSVParser.JSON2CSV(scope) : scope;
  }
}

module.exports = RasporedService;
