module.exports = async (DbContext) => {
  //#region Moji inserti

  //#region Dan

  let ponedeljakId = await DbContext.Dan.create({ naziv: "Ponedeljak" });
  let utorakId = await DbContext.Dan.create({ naziv: "Utorak" });
  let srijedaId = await DbContext.Dan.create({ naziv: "Srijeda" });
  let cetvrtakId = await DbContext.Dan.create({ naziv: "Četvrtak" });
  let petakId = await DbContext.Dan.create({ naziv: "Petak" });

  //#endregion

  //#region Predmet

  let bwtId = await DbContext.Predmet.create({ naziv: "BWT" });
  let aspId = await DbContext.Predmet.create({ naziv: "ASP" });
  let pjpId = await DbContext.Predmet.create({ naziv: "PJP" });
  let vvsId = await DbContext.Predmet.create({ naziv: "VVS" });
  let icrId = await DbContext.Predmet.create({ naziv: "ICR" });
  let murId = await DbContext.Predmet.create({ naziv: "MUR1" });
  let spId = await DbContext.Predmet.create({ naziv: "SP" });

  //#endregion

  //#region Grupe

  //#region BWT Grupe

  let bwtGrupa1 = await DbContext.Grupa.create({ naziv: "grupa1", predmetId: bwtId.id });
  let bwtGrupa2 = await DbContext.Grupa.create({ naziv: "grupa2", predmetId: bwtId.id });
  let bwtGrupa3 = await DbContext.Grupa.create({ naziv: "grupa3", predmetId: bwtId.id });

  //#endregion

  //#region ASP Grupe

  let aspGrupa1 = await DbContext.Grupa.create({ naziv: "grupa1", predmetId: aspId.id });
  let aspGrupa2 = await DbContext.Grupa.create({ naziv: "grupa2", predmetId: aspId.id });
  let aspGrupa3 = await DbContext.Grupa.create({ naziv: "grupa3", predmetId: aspId.id });

  //#endregion

  //#region PJP Grupe

  let pjpGrupa1 = await DbContext.Grupa.create({ naziv: "grupa1", predmetId: pjpId.id });
  let pjpGrupa2 = await DbContext.Grupa.create({ naziv: "grupa2", predmetId: pjpId.id });
  let pjpGrupa3 = await DbContext.Grupa.create({ naziv: "grupa3", predmetId: pjpId.id });

  //#endregion

  //#region VVS Grupe

  let vvsGrupa1 = await DbContext.Grupa.create({ naziv: "grupa1", predmetId: vvsId.id });
  let vvsGrupa2 = await DbContext.Grupa.create({ naziv: "grupa2", predmetId: vvsId.id });
  let vvsGrupa3 = await DbContext.Grupa.create({ naziv: "grupa3", predmetId: vvsId.id });

  //#endregion

  //#region ICR Grupe

  let icrGrupa1 = await DbContext.Grupa.create({ naziv: "grupa1", predmetId: icrId.id });
  let icrGrupa2 = await DbContext.Grupa.create({ naziv: "grupa2", predmetId: icrId.id });
  let icrGrupa3 = await DbContext.Grupa.create({ naziv: "grupa3", predmetId: icrId.id });

  //#endregion

  //#region MUR Grupe

  let murGrupa1 = await DbContext.Grupa.create({ naziv: "grupa1", predmetId: murId.id });
  let murGrupa2 = await DbContext.Grupa.create({ naziv: "grupa2", predmetId: murId.id });
  let murGrupa3 = await DbContext.Grupa.create({ naziv: "grupa3", predmetId: murId.id });

  //#endregion

  //#region SP Grupe

  let spGrupa1 = await DbContext.Grupa.create({ naziv: "grupa1", predmetId: spId.id });
  let spGrupa2 = await DbContext.Grupa.create({ naziv: "grupa2", predmetId: spId.id });
  let spGrupa3 = await DbContext.Grupa.create({ naziv: "grupa3", predmetId: spId.id });

  //#endregion

  //#endregion

  //#region Tip

  let predavanjeTipId = DbContext.Tip.create({ naziv: "Predavanje" });
  let vjezbeTipId = DbContext.Tip.create({ naziv: "Vježbe" });
  let tutorijalTipId = DbContext.Tip.create({ naziv: "Tutorijal" });
  let kvizTipId = DbContext.Tip.create({ naziv: "Kviz" });
  let prviParcijalniIspitTip = DbContext.Tip.create({ naziv: "Prvi parcijalni ispit" });
  let drugiParcijalniIspitTip = DbContext.Tip.create({ naziv: "Drugi parcijalni ispit" });
  let zavrsniIspit = DbContext.Tip.create({ naziv: "Završni ispit" });

  //#endregion

  //#endregion

  //#region Postavka drugog zadataka

  let rmaId = await DbContext.Predmet.create({ naziv: "RMA" });
  let wtId = await DbContext.Predmet.create({ naziv: "WT" });

  let rmaGrupa1 = await DbContext.Grupa.create({ naziv: "RMAgrupa1", predmetId: rmaId.id });

  let wtGrupa1 = await DbContext.Grupa.create({ naziv: "WTgrupa1", predmetId: wtId.id });
  let wtGrupa2 = await DbContext.Grupa.create({ naziv: "WTgrupa2", predmetId: wtId.id });

  let studentNeko = await DbContext.Student.create({
    ime: "Neko Nekić",
    index: "12345",
  });

  DbContext.GrupaStudenti.create({ grupaId: wtGrupa1.id, studentId: studentNeko.id });

  let studentCetvrti = await DbContext.Student.create({
    ime: "Četvrti Neko",
    index: "18009",
  });

  DbContext.GrupaStudenti.create({ grupaId: rmaGrupa1.id, studentId: studentCetvrti.id });

  //#endregion

  //#endregion
};
