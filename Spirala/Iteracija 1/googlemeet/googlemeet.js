// NAPOMENA: U slučaju promjena HTML forme c2 stranice, određene izmjene u SECTION_WILDCARD_QUERY i LINK_QUERY su potrebne

class GoogleMeet {
  static SECTIONS_WILDCARD_QUERY = "[id*='section-']";
  static LINK_QUERY = ".course-content .weeks .contentwithoutlink a";
  static MEET_UTL = "meet.google.com";
  static PREDAVANJE_IDENTIFIER = "predavanj";
  static VJEZBE_IDENTIFIER = "";

  static parsirajIDBroj(id) {
    return +id.replace(/^\D+/g, "");
  }

  static dajZadnjePredavanje(html) {
    if (html.length === 0) return null;

    let predavanja = [];

    new DOMParser()
      .parseFromString(html, "text/html")
      .querySelectorAll(this.SECTIONS_WILDCARD_QUERY)
      .forEach((section) => {
        section.querySelectorAll(this.LINK_QUERY).forEach((a, sectionOffset) => {
          if (a && a.href.match(this.MEET_UTL) && a.innerHTML.match(this.PREDAVANJE_IDENTIFIER))
            predavanja.push({
              id: this.parsirajIDBroj(section.id) + sectionOffset,
              href: a.getAttribute("href"),
            });
        });
      });

    if (predavanja.length === 0) return null;
    else if (predavanja.length === 1) return predavanja[0].href;

    predavanja.sort((a, b) => {
      return b.id - a.id;
    });

    return predavanja[0].href;
  }

  static dajZadnjuVjezbu(html) {
    if (html.length === 0) return null;

    let vjezbe = [];

    new DOMParser()
      .parseFromString(html, "text/html")
      .querySelectorAll(this.SECTIONS_WILDCARD_QUERY)
      .forEach((section) => {
        section.querySelectorAll(this.LINK_QUERY).forEach((a, sectionOffset) => {
          if (a && a.href.match(this.MEET_UTL) && (a.innerHTML.match("vjezb") || a.innerHTML.match("vježb")))
            vjezbe.push({
              id: this.parsirajIDBroj(section.id) + sectionOffset,
              href: a.getAttribute("href"),
            });
        });
      });

    if (vjezbe.length === 0) return null;
    else if (vjezbe.length === 0) return vjezbe[0].href;

    vjezbe.sort((a, b) => {
      return b.id - a.id;
    });

    return vjezbe[0].href;
  }
}
