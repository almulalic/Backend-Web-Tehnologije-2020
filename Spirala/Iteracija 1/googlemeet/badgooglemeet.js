class BadGoogleMeet {
  static LINK_QUERY = "a";
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
      .querySelectorAll("a")
      .forEach((section) => {
        section.querySelectorAll(this.LINK_QUERY).forEach((a) => {
          if (a && a.href.match(this.MEET_UTL)) predavanja.push(a.getAttribute("href"));
        });
      });

    if (predavanja.length === 0) return null;
    else if (predavanja.length === 1) return predavanja[0];

    return predavanja[0];
  }

  static dajZadnjuVjezbu(html) {
    if (html.length === 0) return null;

    let vjezbe = [];

    new DOMParser()
      .parseFromString(html, "text/html")
      .querySelectorAll("a")
      .forEach((section) => {
        section.querySelectorAll(this.LINK_QUERY).forEach((a) => {
          if (a && a.href.match(this.MEET_UTL)) vjezbe.push(a.getAttribute("href"));
        });
      });

    if (vjezbe.length === 0) return null;
    else if (vjezbe.length === 0) return vjezbe[0];

    return vjezbe[0];
  }
}
