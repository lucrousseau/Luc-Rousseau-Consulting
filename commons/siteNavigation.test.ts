import { getSiteNavigationItems } from "./siteNavigation";

describe("getSiteNavigationItems", () => {
  const t = (key) =>
    ({
      "common:home-link-label": "Accueil",
      "common:situations-link-label": "Situations",
      "common:contact-link-label": "Contact",
    })[key] ?? key;

  it("returns home, situations, and contact by default", () => {
    expect(getSiteNavigationItems(t)).toEqual([
      { label: "Accueil", href: "/" },
      { label: "Situations", href: "/situations" },
      { label: "Contact", href: "#contact" },
    ]);
  });

  it("can omit home", () => {
    expect(getSiteNavigationItems(t, { includeHome: false })).toEqual([
      { label: "Situations", href: "/situations" },
      { label: "Contact", href: "#contact" },
    ]);
  });
});
