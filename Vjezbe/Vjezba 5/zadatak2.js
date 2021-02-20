const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./server");

chai.use(chaiHttp);

describe("testiranje PUT na /", function () {
  beforeEach(function (done) {
    fs = require("fs");
    fs.writeFile("./knjige.txt", "Pro Git,33,meki uvez,4.16", function () {});
    done();
  });
  afterEach(function (done) {
    delete require.cache[require.resolve("fs")];
    done();
  });
  it("PUT ce mjenjat naslov prve knjige", function (done) {
    const staroImeArtikla = "Pro Git";

    chai
      .request(server)
      .put("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0][0].should.not.equal(staroImeArtikla);
        done();
      });
  });
});

describe("testiranje DELETE na /", function () {
  beforeEach(function (done) {
    fs = require("fs");
    fs.writeFile("./knjige.txt", "Pro Git,33,meki uvez,4.16", function () {});
    done();
  });
  afterEach(function (done) {
    delete require.cache[require.resolve("fs")];
    done();
  });
  it("Delete ce obrisati sve knjige", function (done) {
    chai
      .request(server)
      .delete("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(0);
        done();
      });
  });
});
