const base_api_url = "http://localhost:8080";

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
  ucitajAktivnosti();
  ucitajPredmete();
  ucitajDan();
  ucitajTipove();
  ucitajGrupe();
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

      tableHTML += `<td>${x.predmet ? x.predmet.naziv : "NULL"}-${x.grupa ? x.grupa.naziv : "NULL"}</td>`;
      tableHTML += `<td>${x.naziv}-${x.tip ? x.tip.naziv : "NULL"}</td>`;
      tableHTML += `<td>${x.dan ? x.dan.naziv : "NULL"}</td>`;
      tableHTML += `<td>${x.pocetak}min</td>`;
      tableHTML += `<td>${x.kraj}min</td>`;

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
        <td>${x.naziv}</td>
      </tr>`;
    });

    tablePredmetiBody.html(tableHTML);
  }
}

function ucitajAktivnosti() {
  $.ajax({
    type: "GET",
    url: `${base_api_url}/v2/aktivnost/all`,
    success: (data) => generisiTabeluAktivnosti(data, null),
  });
}

function ucitajPredmete() {
  $.ajax({
    type: "GET",
    url: `${base_api_url}/v2/predmet/all`,
    success: (data) => generisiTabeluPredmeta(data, null),
    error: (err) => generisiTabeluPredmeta(null, err),
  });
}

function ucitajTipove() {
  $.ajax({
    type: "GET",
    url: `${base_api_url}/v2/tip/all`,
    success: (tipovi) => {
      tipovi.forEach((x) => {
        $("#tipSelect").append(new Option(x.naziv, x.id));
      });
    },
    error: (err) => console.log(err),
  });
}

function ucitajGrupe() {
  $.ajax({
    type: "GET",
    url: `${base_api_url}/v2/grupa/all`,
    success: (grupe) => {
      grupe.forEach((x) => {
        $("#grupaSelect").append(new Option(x.naziv, x.id));
      });
    },
    error: (err) => console.log(err),
  });
}

function ucitajDan() {
  $.ajax({
    type: "GET",
    url: `${base_api_url}/v2/dan/all`,
    success: (dani) => {
      dani.forEach((x) => {
        $("#danSelect").append(new Option(x.naziv, x.id));
      });
    },
    error: (err) => console.log(err),
  });
}

function dajPredmet(naziv) {
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/v2/predmet?naziv=${naziv}`,
    success: (data) => {
      return data;
    },
    error: (error) => {
      handleError(JSON.parse(error.responseText));
    },
  });
}

function brojAktivnostiZaPredmet(naziv) {
  return new Promise((resolve) => {
    $.ajax({
      method: "GET",
      url: `${base_api_url}/v2/aktivnost?naziv=${naziv}`,
      success: (data) => {
        if (data) return data.length;
        else return 0;
      },
      error: (error) => {
        handleError(error.responseText);
      },
    });
  });
}

function dodajPredmet() {
  $.ajax({
    method: "POST",
    contentType: "application/json",
    url: `http://localhost:8080/v2/predmet`,
    data: JSON.stringify({
      naziv: $("#nazivInput").val() ?? "",
    }),
    success: (predmet) => {
      $("#predmetId").val(predmet.id);
      dodajAktivnost();
    },
    error: (error) => {
      handleError(error.responseText);
    },
  });
}

function obrisiPredmet(naziv) {
  $.ajax({
    method: "DELETE",
    url: `http://localhost:8080/v2/predmet?naziv=${naziv}`,
    success: () => {
      $("#predmetId").value(null);
    },
    error: (error) => {
      handleError(error.responseText);
    },
  });
}

function dodajAktivnost() {
  let naziv = $("#nazivInput").val() ?? "";
  $.ajax({
    method: "POST",
    contentType: "application/json",
    url: `http://localhost:8080/v2/aktivnost`,
    data: JSON.stringify({
      naziv: $("#aktivnostiInput").val() ?? "",
      pocetak: $("#pocetakInput").val() ?? "",
      kraj: $("#krajInput").val() ?? "",
      predmetId: $("#predmetId").val() ?? "",
      grupaId: $("#grupaSelect").val() ?? "",
      danId: $("#danSelect").val() ?? "",
      tipId: $("#tipSelect").val() ?? "",
    }),
    success: () => {
      ucitajAktivnosti();
      ucitajPredmete();
      handleSuccess("Aktivnost dodana.");
    },
    error: async (error) => {
      handleError(error.responseText);
      if ((await brojAktivnostiZaPredmet(naziv)) == 0) obrisiPredmet(naziv);
    },
  });
}

function izvrsiDodavanje() {
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/v2/predmet?naziv=${$("#nazivInput").val()}`,
    success: (data) => {
      if (data == null) dodajPredmet(naziv);
      else {
        $("#predmetId").val(data.id);
        dodajAktivnost();
      }
    },
    error: (error) => {
      handleError(error.responseText);
    },
  });
}
