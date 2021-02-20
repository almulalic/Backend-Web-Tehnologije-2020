DanAlias = new Map([
  ["nedelja", 0],
  ["ponedeljak", 1],
  ["utorak", 2],
  ["srijeda", 3],
  ["cetvrtak", 4],
  ["petak", 5],
  ["subota", 6],
  ["ned", 0],
  ["pon", 1],
  ["uto", 2],
  ["sri", 3],
  ["cet", 4],
  ["pet", 5],
  ["sub", 6],
]);

AktivnostAlias = new Map([
  ["predavanje", 0],
  ["vježbe", 1],
]);

function jeValidnoVrijeme(vrijeme) {
  const [sati, minute] = vrijeme.split(":");
  return +sati > 0 && +sati <= 24 && +minute >= 0 && +minute <= 60;
}

function jeValidanInterval(pocetak, kraj) {
  const [satiPocetak, minutePocetak] = pocetak.split(":");
  const [satiKraj, minuteKraj] = kraj.split(":");
  return +satiPocetak == +satiKraj ? +minutePocetak < +minuteKraj : satiPocetak < satiKraj;
}

module.exports = {
  AktivnostAlias,
  DanAlias,
  jeValidnoVrijeme,
  jeValidanInterval,
};
