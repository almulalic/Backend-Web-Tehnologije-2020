const DbContext = require("./models/DbContext");
const bodyParser = require("body-parser");
const initialization = require("./models/initialization");
const express = require("express");
const cors = require("cors");

//#region V1 Import

const RC = require("./controller/v1/rasporedController.js");
const PIC = require("./controller/v1/predmetiController.js");
const PC = require("./controller/v1/predmetController.js");

const V1Controllers = {
  rasporedController: RC,
  predmetiController: PIC,
  predmetController: PC,
};

//#endregion

//#region V2 Import

const aktivnostController = require("./controller/v2/aktivnostController.js");
const danController = require("./controller/v2/danController.js");
const grupaController = require("./controller/v2/grupaController.js");
const predmetController = require("./controller/v2/predmetController.js");
const studentController = require("./controller/v2/studentController.js");
const tipController = require("./controller/v2/tipController.js");

//#endregion

const shouldForceSync = true;
const app = express();
const port = process.env.PORT || 8080;

//#region Express inicijalizacije

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//#endregion

//#region Static

app.use(express.static("../view"));
app.use(express.static("../style"));
app.use(express.static("../script"));

//#endregion

//#region V1 Rute

app.use("/v1/raspored", V1Controllers.rasporedController);
app.use("/v1/predmeti", V1Controllers.predmetiController);
app.use("/v1/predmet", V1Controllers.predmetController);

//#endregion

//#region V2 Rute

app.use("/v2/aktivnost", aktivnostController);
app.use("/v2/dan", danController);
app.use("/v2/grupa", grupaController);
app.use("/v2/predmet", predmetController);
app.use("/v2/student", studentController);
app.use("/v2/tip", tipController);

//#endregion

app.listen(port, () => {
  console.log("INFO: Server is running on port: " + port + "\n\n");
  console.log("INFO: Pokusavam generisati tabele i relacije...\n");
  DbContext.sequelize.sync({ force: shouldForceSync }).then(async () => {
    console.log(" \n\nINFO: Tabele uspjesno generisane!");
    console.log(" \n\nINFO: Pokusavam genrisati podatke!");

    await initialization(DbContext);

    console.log(" \n\nINFO: Uspješno generisani default podaci!");
  });
});

module.exports = app;
