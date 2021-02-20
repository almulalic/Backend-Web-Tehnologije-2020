const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const rasporedController = require("./controller/rasporedController.js");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/raspored", rasporedController);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});

module.exports = app;
