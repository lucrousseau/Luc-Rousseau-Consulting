import { absoluteUrl, localizedAbsoluteUrl, localizedPath } from "./localizedPath";

const base = "https://lucrousseau.com";
const defaultLocale = "fr";

describe("localizedPath", () => {
  it("keeps default locale paths unprefixed", () => {
    expect(localizedPath("fr", defaultLocale, "/situations/premier-dev-fractionnel")).toBe(
      "/situations/premier-dev-fractionnel"
    );
  });

  it("prefixes non-default locale paths", () => {
    expect(localizedPath("en", defaultLocale, "/situations/post-funding-first-developer")).toBe(
      "/en/situations/post-funding-first-developer"
    );
    expect(localizedPath("en", defaultLocale, "/")).toBe("/en");
  });

  it("builds absolute localized URLs for SEO", () => {
    expect(
      localizedAbsoluteUrl(base, "en", defaultLocale, "/situations/post-funding-first-developer")
    ).toBe(`${base}/en/situations/post-funding-first-developer`);
    expect(localizedAbsoluteUrl(base, "fr", defaultLocale, "/situations")).toBe(
      `${base}/situations`
    );
    expect(absoluteUrl(base, "/")).toBe(`${base}/`);
  });
});
