let assert = chai.assert;

describe("Krug", function () {
  describe("#povrsina kruga", function () {
    it("treba vratiti PI kada je prečnik kruga 2", function () {
      const k1 = new Krug(1, 1, 2);
      assert.equal(k1.povrsina, Math.PI);
    });
    it("treba vratiti 0 kada je prečnik kruga 0", function () {
      const k1 = new Krug(1, 1, 0);
      assert.equal(k1.povrsina, 0);
    });
    it("treba vratiti 4PI kada je prečnik kruga 4", function () {
      const k1 = new Krug(1, 1, 4);
      assert.equal(k1.povrsina, 4 * Math.PI);
    });
  });
});

describe("Krug", function () {
  describe("#obim kruga", function () {
    it("treba vratiti PI kada je prečnik kruga 1", function () {
      const k1 = new Krug(1, 1, 1);
      assert.equal(k1.obim, Math.PI);
    });
    it("treba vratiti 0 kada je prečnik kruga 0", function () {
      const k1 = new Krug(1, 1, 0);
      assert.equal(k1.obim, 0);
    });
    it("treba vratiti 4PI kada je prečnik kruga 4", function () {
      const k1 = new Krug(1, 1, 4);
      assert.equal(k1.obim, 4 * Math.PI);
    });
  });
});

describe("Papir", function () {
  describe("#pravljenjePapira", function () {
    it("treba vratiti 1 kad je kurg veći od papira", function () {
      const p1 = new Papir(1, 2);
      const k1 = new Krug(4, 5, 1);
      assert.equal(p1.dodajKrug(k1), 1);
    });
    it("treba dodati krug kada je manji od papira", function () {
      const p1 = new Papir(4, 5, 2);
      const k1 = new Krug(1, 2, 4);
      assert.notEqual(p1.dodajKrug(k1), 1);
    });
    it("treba ispisati sve krugove pozivom metode ispisi krugove", function () {
      const p1 = new Papir(4, 5);
      const k1 = new Krug(1, 2, 1);
      const k2 = new Krug(2, 3, 2);
      const k3 = new Krug(3, 4, 3);

      p1.dodajKrug(k1);
      p1.dodajKrug(k2);
      p1.dodajKrug(k3);

      p1.ispitiKrugove();
      var log = console.log;
      console.log(log);
    });
  });
});
