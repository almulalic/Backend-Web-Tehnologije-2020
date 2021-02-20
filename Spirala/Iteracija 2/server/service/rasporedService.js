const fs = require("fs");
const path = require("path");

const CSVParser = require("./../common/CSVParser");
const { DanAlias, AktivnostAlias, jeValidnoVrijeme, jeValidanInterval } = require("../common/shared");

class RasporedService {
  static parametri = ["naziv", "aktivnost", "dan", "pocetak", "kraj"];

  static ValidirajFormu(body) {
    if (!body.nazivPredmeta) throw Error("Polje 'nazivPredmeta' nije pronadjeno u formi ili je prazno.");
    else if (!body.aktivnost) throw Error("Polje 'aktivnost' nije pronadjeno u formi ili je prazno.");
    else if (!body.dan) throw Error("Polje 'dan' nije pronadjeno u formi ili je prazno.");
    else if (!body.vrijemePocetak)
      throw Error("Polje 'vrijemePocetak' nije pronadjeno u formi ili je prazno.");
    else if (!body.vrijemeKraj) throw Error("Polje 'vrijemeKraj' nije pronadjeno u formi ili je prazno.");

    if (Object.values(body).length > 5)
      // Ovim se postize da se sprijeci da neko u novu kolonu unese csv i simulira SQL injection (u nekoj mjeri opet je moguce)
      throw Error(
        "U form ise nalazi više polja od predviđenog. Trenutno je podržano parsiranje polja: 'nazivPredmeta','aktivnost','dan','vrijemePocetka','vrijemeKraja'"
      );
    if (AktivnostAlias.get(body.aktivnost.toLowerCase()) === undefined)
      throw Error(
        "Polje 'aktivnost' ne sadrži validanu aktivnost, validne aktivnosti su: 'predavanje','vježbe'"
      );
    else if (!DanAlias.get(body.dan) === undefined)
      throw Error(
        "Polje 'dan' ne sadrži validan dan, validni dani su: '(pon)edeljak','(uto)rak','(sri)jeda','(čet)vrtak','(pet)ak','(sub)ota','(ned)elja' "
      );
    else if (!jeValidnoVrijeme(body.vrijemePocetak))
      throw Error(
        "Polje 'vrijemePocetka' nije validno. Podržani format je HH:MM, sati se predstavljaju u 24-satnom formatu."
      );
    else if (!jeValidnoVrijeme(body.vrijemeKraj))
      throw Error(
        "Polje 'vrijemeKraj' nije validno. Podržani format je HH:MM, sati se predstavljaju u 24-satnom formatu."
      );
    else if (!jeValidanInterval(body.vrijemePocetak, body.vrijemeKraj))
      throw Error(
        "Vrijeme trajanja aktivnosti nije validno. 'vrijemePocetka' mora biti prije vremena 'vrijemeKraj'"
      );

    return true;
  }

  static ProvjeriValidnostVremena(body) {
    const trenutniRaspored = CSVParser.ParseCSV();

    const dan = DanAlias.get(body.dan);

    const poc = new Date("1/1/1999" + body.vrijemePocetak.split(":") + ":00");
    const krj = new Date("1/1/1999" + body.vrijemeKraj.split(":") + ":00");

    trenutniRaspored.forEach((x) => {
      if (dan === x.danId) {
        if (satiKraja <= x.satiKraja) throw Error("Postoji aktivnost u datom vremenu");
      }
    });
  }

  static DodajNovuAktivnost(body) {
    fs.appendFileSync(path.resolve("./data/raspored.csv"), CSVParser.FormaToCSV(body));
  }

  static SortirajPo(result, ord, attr) {
    switch (attr) {
      case "naziv":
        return result.sort((a, b) => {
          return ord === "A"
            ? a.nazivPredmeta.localeCompare(b.nazivPredmeta)
            : b.nazivPredmeta.localeCompare(a.nazivPredmeta);
        });
      case "aktivnost":
        return result.sort((a, b) => {
          return ord === "A"
            ? a.aktivnost.localeCompare(b.nazivPredmeta)
            : b.aktivnost.localeCompare(a.nazivPredmeta);
        });
      case "dan":
        return result.sort((a, b) => {
          return ord === "A" ? a.danId - b.danId : b.danId - a.danId;
        });
      case "pocetak":
        return result.sort((a, b) => {
          return ord === "A"
            ? a.vrijemePocetak.localeCompare(b.vrijemePocetak)
            : b.vrijemePocetak.localeCompare(a.vrijemePocetak);
        });
      case "kraj":
        return result.sort((a, b) => {
          return ord === "A"
            ? a.vrijemeKraj.localeCompare(b.vrijemeKraj)
            : b.vrijemeKraj.localeCompare(a.vrijemeKraj);
        });
    }
  }

  static DajAktivnostiZaDan(dan, acceptHeader, queryParams) {
    let danId = DanAlias.get(dan);

    if (dan && danId === undefined) throw Error("Dan nije validan");

    let raspored = CSVParser.ParseCSV();

    let scope = dan
      ? raspored.filter((x) => {
          return x.danId == danId;
        })
      : raspored;

    let ord = queryParams.sort[0];
    let attr = queryParams.sort.slice(1);

    if (this.parametri.includes(attr.toLowerCase())) scope = this.SortirajPo(scope, ord, attr.toLowerCase());

    return acceptHeader == "text/csv" ? CSVParser.JSON2CSV(scope) : scope;
  }
}

module.exports = RasporedService;
