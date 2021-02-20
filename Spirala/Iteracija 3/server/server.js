const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const rasporedController = require("./controller/rasporedController.js");
const predmetiController = require("./controller/predmetiController.js");
const predmetController = require("./controller/predmetController.js");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("../view"));
app.use(express.static("../style"));
app.use(express.static("../script"));

app.use("/raspored", rasporedController);
app.use("/predmeti", predmetiController);
app.use("/predmet", predmetController);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});

module.exports = app;
