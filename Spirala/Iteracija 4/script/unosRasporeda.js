var tableAktivnostiBody = $("#tableAktivnostiBody");
var tablePredmetiBody = $("#tablePredmetiBody");

var output = $("#form-output");

function handleSuccess(message) {
  output.html(`
    <div class="successContainer">
    <p>${message}</p>
    </div>
  `);
}

function handleError(message) {
  output.html(`
  <div class="errorContainer">
    <p class='error'>Greška na serveru, pokušajte ponovo.</p>
    <p> <span class="bold">ERR MESSAGE: </span>${message}</p>
  </div>
`);
}

$(document).ready(function () {
  ucitajSortirano(null, null, generisiTabeluAktivnosti);
  ucitajPredmete();
});

function generisiTabeluAktivnosti(data, error) {
  if (error)
    handleError(`
      <div class="errorContainer">
        <p class='error'>Greška na serveru, pokušajte ponovo.</p>
        <p><span class="bold">ERR MESSAGE: </span>${JSON.parse(error.responseText)}</p>
      </div>
    `);
  else {
    tableHTML = "";
    data.forEach((x) => {
      tableHTML += "<tr>";

      tableHTML += `<td>${x.naziv}</td>`;
      tableHTML += `<td>${x.aktivnost}</td>`;
      tableHTML += `<td>${x.dan}</td>`;
      tableHTML += `<td>${x.pocetak}</td>`;
      tableHTML += `<td>${x.kraj}</td>`;

      tableHTML += "</tr>";
    });

    tableAktivnostiBody.html(tableHTML);
  }
}

function generisiTabeluPredmeta(data, error) {
  if (error)
    handleError(`
      <div class="errorContainer">
        <p class='error'>Greška na serveru, pokušajte ponovo.</p>
        <p><span class="bold">ERR MESSAGE: </span>${JSON.parse(error.responseText)}</p>
      </div>
    `);
  else {
    tableHTML = "";

    data.forEach((x) => {
      tableHTML += `
      <tr>
        <td>${x}</td>
      </tr>`;
    });

    tablePredmetiBody.html(tableHTML);
  }
}

function ucitajPredmete() {
  $.ajax({
    type: "GET",
    url: `${base_api_url}/predmeti`,
    success: (data) => generisiTabeluPredmeta(data, null),
    error: (err) => generisiTabeluPredmeta(null, err),
  });
}

function dajPredmet(naziv) {
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/v1/predmet/${naziv}`,
    success: (data) => console.log(data),
    error: (error) => {
      handleError(JSON.parse(error.responseText));
    },
  });
}

function brojAktivnostiZaPredmet(naziv) {
  return new Promise((resolve) => {
    $.ajax({
      method: "GET",
      url: `http://localhost:8080/v1/predmet/${naziv}/brojAktivnosti`,
      success: (data) => resolve(data),
      error: (error) => {
        handleError(JSON.parse(error.responseText));
      },
    });
  });
}

function dodajPredmet() {
  $.ajax({
    method: "POST",
    contentType: "application/json",
    url: `http://localhost:8080/v1/predmet`,
    data: JSON.stringify({
      naziv: $("#nazivInput").val() ?? "",
    }),
    success: () => dodajAktivnost(),
    error: (error) => {
      handleError(JSON.parse(error.responseText));
    },
  });
}

function obrisiPredmet(naziv) {
  $.ajax({
    method: "DELETE",
    url: `http://localhost:8080/v1/predmet/${naziv}`,
    error: (error) => {
      handleError(JSON.parse(error.responseText));
    },
  });
}

function dodajAktivnost() {
  let naziv = $("#nazivInput").val() ?? "";

  $.ajax({
    method: "POST",
    contentType: "application/json",
    url: `http://localhost:8080/v1/raspored`,
    data: JSON.stringify({
      naziv: naziv,
      aktivnost: $("#aktivnostiInput").val() ?? "",
      dan: $("#danInput").val() ?? "",
      pocetak: $("#pocetakInput").val() ?? "",
      kraj: $("#krajInput").val() ?? "",
    }),
    success: () => {
      ucitajSortirano(null, null, generisiTabeluAktivnosti);
      ucitajPredmete();
      handleSuccess("Aktivnost dodana.");
    },
    error: async (error) => {
      if ((await brojAktivnostiZaPredmet(naziv)) == 0) obrisiPredmet(naziv);

      handleError(JSON.parse(error.responseText));
    },
  });
}

function izvrsiDodavanje() {
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/predmet/${naziv}`,
    success: (data) => {
      if (data == null) dodajPredmet(naziv);
      else dodajAktivnost();
    },
    error: (error) => {
      handleError(JSON.parse(error.responseText));
    },
  });
}
