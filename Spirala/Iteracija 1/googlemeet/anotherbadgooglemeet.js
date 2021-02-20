// NAPOMENA: U slučaju promjena HTML forme c2 stranice, određene izmjene u SECTION_WILDCARD_QUERY i LINK_QUERY su potrebne

class AnotherBadGoogleMeet {
  static LINK_QUERY = "a";
  static MEET_UTL = "google";
  static VJEZBE_IDENTIFIER = "";

  static parsirajIDBroj(id) {
    return +id.replace(/^\D+/g, "");
  }

  static dajZadnjePredavanje(html) {
    let predavanja = [];

    new DOMParser()
      .parseFromString(html, "text/html")
      .querySelectorAll("a")
      .forEach((section) => {
        predavanja.push(section.getAttribute("href"));
      });

    if (predavanja.length === 0) return null;

    return predavanja[0];
  }

  static dajZadnjuVjezbu(html) {
    let vjezbe = [];

    new DOMParser()
      .parseFromString(html, "text/html")
      .querySelectorAll("a")
      .forEach((section) => {
        vjezbe.push(section.getAttribute("href"));
      });

    if (vjezbe.length === 0) return null;

    return vjezbe[0];
  }
}
