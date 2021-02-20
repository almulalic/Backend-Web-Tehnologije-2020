const rowOutput = $("#tableAktivnostiBody");
const errorOutput = $("#errorOutput");
const headerTriggers = $("#header");
const danDropdown = $("#izborDana");

const sortAscIcon = `<i class="fas fa-sort-amount-down-alt"/>`;
const sortDescIcon = `<i class="fas fa-sort-amount-up"/>`;

var dan = null;
const sort = {
  atribut: null,
  orderAscending: true,
};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ukloniSort(id) {
  $(`#${id}`).html(capitalize(id));
}

function handleError(message) {
  errorOutput.html(`
  <div class="errorContainer">
    <p class='error'>Greška na serveru, pokušajte ponovo.</p>
    <p> <span class="bold">ERR MESSAGE: </span>${message}</p>
  </div>
`);
}

function generisiTabelu(data, error) {
  if (error) handleError.html(handleError(error.responseText));
  else {
    let tableHTML = "";

    data.forEach((x) => {
      tableHTML += "<tr>";

      Object.values(x).forEach((y) => {
        tableHTML += `<td>${y}</td>`;
      });

      tableHTML += "</tr>";
    });

    rowOutput.html(tableHTML);
  }
}

danDropdown.on("change", (e) => {
  dan = e.target.value == "svi" ? null : e.target.value;
  ucitajSortirano(dan, null, generisiTabelu);
});

function promjeniSort(e) {
  const id = e.currentTarget.id;

  if (sort.atribut == id) {
    ucitajSortirano(dan, `${sort.orderAscending ? "A" : "D"}${sort.atribut}`, generisiTabelu);
  } else {
    if (sort.atribut) ukloniSort(sort.atribut);
    sort.atribut = id;
    ucitajSortirano(dan, `${sort.orderAscending ? "A" : "D"}${sort.atribut}`, generisiTabelu);
  }

  e.currentTarget.innerHTML = `
    <td>
      ${capitalize(id)} ${sort.orderAscending ? sortAscIcon : sortDescIcon}
    </td>
  `; // dodavanje ikonice

  sort.orderAscending = !sort.orderAscending;
}

headerTriggers.on("click", "#naziv, #aktivnost, #dan, #pocetak, #kraj", promjeniSort);

ucitajSortirano(dan, `${sort.orderAscending ? "A" : "D"}${sort.atribut}`, generisiTabelu);
