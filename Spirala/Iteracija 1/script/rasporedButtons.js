const buttons = document.getElementsByClassName("testniSlucaj");
const output = document.getElementById("output");

for (let i = 0; i < buttons.length; ++i) {
  buttons[i].addEventListener("click", function (e) {
    const element = document.getElementById(e.target.id);
    element.classList.add("aktivan");

    for (let i = 0; i < buttons.length; ++i)
      if (buttons[i].id != e.target.id) buttons[i].classList.remove("aktivan");
  });
}

function dajTrenutnuAktivnost() {
  // const izabraniPrimjer = document.getElementsByClassName("aktivan");

  // if (izabraniPrimjer.length === 0) {
  //   output.innerHTML = `<div><span class="bad">Izaberite testni CSV string</span></div>`;
  //   return;
  // }

  // const datum = document.getElementById("trenutnaAktivnostDatum").value;

  // if (datum.length === 0) {
  //   output.innerHTML = `<div><span class="bad">${izabraniPrimjer[0].innerHTML}: Datum nije validan</span></div>`;
  //   return;
  // }

  // const grupa = document.getElementById("trenutnaAktivnostGrupa").value;

  // if (grupa.length === 0) {
  //   output.innerHTML = `<div><span class="bad">${izabraniPrimjer[0].innerHTML}: Grupa nije validna</span></div>`;
  //   return;
  // }

  // const raspored = new Raspored(rasporedi[+izabraniPrimjer[0].id]);

  console.log(new Raspored(rasporedi[0]).dajTrenutnuAktivnost("09-11-2020T12:00:01", "grupa2"));
  // output.innerHTML = `<div><span class="good">${datum} ${grupa}</span></div>`;
}

function dajSljedecuAktivnost() {
  // const izabraniPrimjer = document.getElementsByClassName("aktivan");

  // if (izabraniPrimjer.length === 0) {
  //   output.innerHTML = `<div><span class="bad">Izaberite testni CSV string</span></div>`;
  //   return;
  // }

  // const datum = document.getElementById("sljedecaAktivnostDatum").value;

  // if (datum.length === 0) {
  //   output.innerHTML = `<div><span class="bad">${izabraniPrimjer[0].innerHTML}: Datum nije validan</span></div>`;
  //   return;
  // }

  const grupa = document.getElementById("sljedecaAktivnostGrupa").value;

  // if (grupa.length === 0) {
  //   output.innerHTML = `<div><span class="bad">${izabraniPrimjer[0].innerHTML}: Grupa nije validna</span></div>`;
  //   return;
  // }

  console.log(new Raspored(rasporedi[0]).dajSljedecuAktivnost("11-11-2020T12:00:00", "grupa2"));
}

function dajPrethodnuAktivnost() {
  // const izabraniPrimjer = document.getElementsByClassName("aktivan");

  // if (izabraniPrimjer.length === 0) {
  //   output.innerHTML = `<div><span class="bad">Izaberite testni CSV string</span></div>`;
  //   return;
  // }

  // const datum = document.getElementById("prethodnaAktivnostDatum").value;

  // if (datum.length === 0) {
  //   output.innerHTML = `<div><span class="bad">${izabraniPrimjer[0].innerHTML}: Datum nije validan</span></div>`;
  //   return;
  // }

  const grupa = document.getElementById("prethodnaAktivnostGrupa").value;

  // if (grupa.length === 0) {
  //   output.innerHTML = `<div><span class="bad">${izabraniPrimjer[0].innerHTML}: Grupa nije validna</span></div>`;
  //   return;
  // }

  console.log(new Raspored(rasporedi[0]).dajPrethodnuAktivnost("09-11-2020T11:59:59", "grupa2"));
}
