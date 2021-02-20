const fs = require("fs");
var path = require("path");

class CSVParser {
  static keys = ["naziv", "aktivnost", "dan", "pocetak", "kraj"];

  static CSV2Array() {
    let rawData = fs
      .readFileSync(path.resolve("./data/predmeti.csv"), { encoding: "utf8", flag: "r" })
      .split("\n");

    if (rawData == "") return [];

    return rawData;
  }

  static CSV2JSON(keys) {
    let rawData = fs
      .readFileSync(path.resolve("./data/raspored.csv"), { encoding: "utf8", flag: "r" })
      .split("\n");

    if (rawData == "") return [];

    return rawData.map((red) => {
      let values = red.split(",");
      return Object.fromEntries(this.keys.map((_, i) => [this.keys[i], values[i]]));
    });
  }

  static CSV2JSON(csv,keys) {
    let rawData = fs
      .readFileSync(path.resolve("./data/raspored.csv"), { encoding: "utf8", flag: "r" })
      .split("\n");

    if (rawData == "") return [];

    return rawData.map((red) => {
      let values = red.split(",");
      return Object.fromEntries(this.keys.map((_, i) => [this.keys[i], values[i]]));
    });
  }

  static JSON2CSV(json) {
    let redovi = [];
    let keys = ["naziv", "aktivnost", "dan", "pocetak", "kraj"];

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
