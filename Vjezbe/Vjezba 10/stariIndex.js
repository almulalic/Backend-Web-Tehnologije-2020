// const bodyParser = require("body-parser");
// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/static", express.static("static"));

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "vjezba9",
// });

// app.get("/imenik", (req, res) => {
//   connection.query("SELECT * FROM imenik;", function (error, results, fields) {
//     if (!error) {
//       let jsonRezultat = Object.values(JSON.parse(JSON.stringify(results)));

//       var tabela = `
//         <table>
//           <thead>
//             <tr>
//               <td>Ime i Prezime</td>
//               <td>Adresa</td>
//               <td>Broj Telefona</td>
//             </tr>
//           </thead>
//         <tbody>`;

//       jsonRezultat.forEach((kontakt) => {
//         tabela += "<tr>";

//         tabela += "<td>" + kontakt.imeIPrezime + "</td>";
//         tabela += "<td>" + kontakt.adresa + "</td>";
//         tabela += "<td>" + kontakt.brojTelefona + "</td>";

//         tabela += "</tr>";
//       });

//       tabela += "</tbody></table>";

//       res.setHeader("Response-Type", "text/html");
//       res.send(tabela);
//     } else {
//       console.log(error);
//     }
//   });
// });

// app.post("/forma", (req, res) => {
//   connection.query(
//     "INSERT INTO imenik(imeIPrezime,adresa,brojTelefona) VALUES(?,?,?)",
//     [req.body.imeIPrezime, req.body.adresa, req.body.brojTelefona],
//     function (error, results) {
//       if (error) {
//         res.sendStatus(400);
//         console.log(error);
//       } else {
//         res.sendStatus(200);
//         res.json();
//       }
//     }
//   );
// });

// app.get("/poznanik/:kontakt", (req, res) => {
//   connection.query(
//     "SELECT i.imeIPrezime,i.adresa,i.brojTelefona FROM imenik i, adresar a WHERE a.idKontakt = ? AND a.idPoznanik = i.id",
//     [req.params.kontakt],
//     function (error, results) {
//       if (error) {
//         res.sendStatus(400);
//         console.log(error);
//       } else {
//         let jsonRezultat = Object.values(JSON.parse(JSON.stringify(results)));

//         var tabela = `
//         <table>
//           <thead>
//             <tr>
//               <td>Ime i Prezime</td>
//               <td>Adresa</td>
//               <td>Broj Telefona</td>
//             </tr>
//           </thead>
//         <tbody>`;

//         jsonRezultat.forEach((kontakt) => {
//           tabela += "<tr>";

//           tabela += "<td>" + kontakt.imeIPrezime + "</td>";
//           tabela += "<td>" + kontakt.adresa + "</td>";
//           tabela += "<td>" + kontakt.brojTelefona + "</td>";

//           tabela += "</tr>";
//         });

//         tabela += "</tbody></table>";

//         res.setHeader("Response-Type", "text/html");
//         res.send(tabela);
//       }
//     }
//   );
// });

// module.exports = app;
