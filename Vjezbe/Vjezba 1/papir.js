class Papir {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.krugovi = [];
  }

  dodajKrug(krug) {
    if (krug.x > this.x || krug.y > this.y) {
      console.log(`Krug sa centrom ${krug.x},${krug.y} i prečnikom ${krug.precnik} ne može stati na papir`);
      return 1; // ili throw
    } else this.krugovi.push(krug);
  }

  ispitiKrugove() {
    this.krugovi.forEach((krug) => {
      console.log(`Krug (${krug.x},${krug.y},${krug.precnik}) sa površinom ${krug.povrsina}`);
    });
  }
}
