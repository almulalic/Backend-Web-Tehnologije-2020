const base_api_url = "http://localhost:8080";

function ucitajSortirano(dan, atribut, callback) {
  $.ajax({
    type: "GET",
    url: `${base_api_url}/raspored${dan ? `/${dan}` : ""}?sort=${atribut}`,
    success: (data) => callback(data, null),
    error: (err) => callback(null, err),
  });
}
