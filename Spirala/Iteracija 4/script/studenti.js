var studentiInput = $("#studentiInput");
var grupaSelect = $("#grupaSelect");

function ucitajGrupe() {
  $.ajax({
    method: "GET",
    url: base_api_url + "/v2/grupa/all",
    success: (grupe) => {
      grupe.forEach((x) => {
        grupaSelect.append(new Option(x.naziv, x.id));
      });
    },
    error: () => {
      grupaSelect.hide();
    },
  });
}

function posaljiFormu() {
  $.ajax({
    method: "POST",
    url: base_api_url + "/v2/student",
    data: { csv: studentiInput.val(), grupaId: grupaSelect.val() },
    type: "application/json",
    success: (res) => {
      let poruka = "";

      if (Array.isArray(res))
        res.forEach((x, i) => {
          poruka += `${x}${i != res.length - 1 ? "\n\n" : ""}`;
        });
      else poruka = res;

      studentiInput.val(poruka.toString());
    },
  });
}

ucitajGrupe();
