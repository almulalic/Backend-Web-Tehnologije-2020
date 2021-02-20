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

function dajZadnjePredavanje() {
  const izabraniPrimjer = document.getElementsByClassName("aktivan");

  if (izabraniPrimjer.length === 0) {
    output.innerHTML = `<div><span class="bad">Izaberite testni HTML string</span></div>`;
    return;
  }

  const zadnjePredavanje = GoogleMeet.dajZadnjePredavanje(primjeri[+izabraniPrimjer[0].id]);

  output.innerHTML = `
    <div>
        <span class="bold">${izabraniPrimjer[0].innerHTML}:</span> 
        <span class="${zadnjePredavanje ? "good" : "bad"}"> ${
    zadnjePredavanje
      ? `<a href=${zadnjePredavanje} target="_blank">${zadnjePredavanje}</a>`
      : "Predavanje nije pronađeno..."
  }</span>
    </div>`;
}

function dajZadnjuVjezbu() {
  const izabraniPrimjer = document.getElementsByClassName("aktivan");
  if (izabraniPrimjer.length === 0) {
    output.innerHTML = `<div><span class="bad">Izaberite testni HTML string</span></div>`;
    return;
  }

  const zadnjaVjezba = GoogleMeet.dajZadnjuVjezbu(primjeri[+izabraniPrimjer[0].id]);

  output.innerHTML = `
  <div>
      <span class="bold">${izabraniPrimjer[0].innerHTML}:</span> 
      <span class="${zadnjaVjezba ? "good" : "bad"}"> ${
    zadnjaVjezba ? `<a href=${zadnjaVjezba} target="_blank">${zadnjaVjezba}</a>` : "Vježba nije pronađena..."
  }</span>
  </div>`;
}
