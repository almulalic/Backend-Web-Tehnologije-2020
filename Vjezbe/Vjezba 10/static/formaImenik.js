function posaljiFormu() {
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/forma",
    data: JSON.stringify({
      ime: document.getElementById("ime").value,
      prezime: document.getElementById("prezime").value,
      adresa: document.getElementById("adresa").value,
      brojTelefona: document.getElementById("brojTelefona").value,
    }),
    contentType: "application/json",
  });
}
