const fs = require("fs");
var path = require("path");

const { DanAlias, AktivnostAlias } = require("./shared");

class CSVParser {
  static numericColumns = [
    "aktivnostId",
    "danId",
    "vrijemePocetakSati",
    "vrijemePocetakMinute",
    "vrijemeKrajSati",
    "vrijemeKrajMinute",
  ];

  static ParseCSV() {
    const rawRows = fs
      .readFileSync(path.resolve("./data/raspored.csv"), { encoding: "utf8", flag: "r" })
      .split("\n");

    let raspored = [];

    rawRows.forEach((delimited) => {
      const aktivnost = delimited.split(",").map((x) => {
        const index = x.indexOf(":");
        const obj = { key: x.slice(0, index).trim(), value: x.slice(index + 1).trim() };

        if (this.numericColumns.includes(obj.key)) obj.value = +obj.value;

        return [obj.key, obj.value];
      });
      if (aktivnost.length == 11) raspored.push(Object.fromEntries(aktivnost));
    });

    return raspored;
  }

  static FormaToCSV(object) {
    let csvStr = "";

    csvStr += `nazivPredmeta:${object.nazivPredmeta.trim()}` + ",";

    csvStr += `aktivnost:${object.aktivnost.trim()}` + ",";
    csvStr += `aktivnostId:${AktivnostAlias.get(object.aktivnost.toLowerCase().trim())}` + ",";

    csvStr += `dan:${object.dan.trim()}` + ",";
    csvStr += `danId:${DanAlias.get(object.dan.toLowerCase().trim())}` + ",";

    const [satiPocetak, minutePocetak] = object.vrijemePocetak.trim().split(":");
    csvStr += `vrijemePocetak:${object.vrijemePocetak}` + ",";
    csvStr += `vrijemePocetakSati:${satiPocetak}` + ",";
    csvStr += `vrijemePocetakMinute:${minutePocetak}` + ",";

    const [satiKraj, minuteKraj] = object.vrijemeKraj.trim().split(":");
    csvStr += `vrijemeKraj:${object.vrijemeKraj}` + ",";
    csvStr += `vrijemeKrajSati:${satiKraj}` + ",";
    csvStr += `vrijemeKrajMinute:${minuteKraj}`;

    return csvStr + "\r\n";
  }

  static JSON2CSV(json) {
    let redovi = [];
    let keys = ["nazivPredmeta", "aktivnost", "dan", "vrijemePocetak", "vrijemeKraj"];

    json.forEach((x) => {
      let red = "";

      Object.entries(x).forEach(([key, value], index) => {
        if (keys.includes(key)) {
          red += key + ":" + value;
          red += ",";
        }
      });

      red += "\n";
      redovi.push(red);
    });

    return redovi;
  }
}

module.exports = CSVParser;
