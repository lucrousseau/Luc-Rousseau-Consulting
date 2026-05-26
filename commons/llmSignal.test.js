import { SITUATIONS } from "./situationsManifest";
import {
  buildHumansTxt,
  buildLlmsFullTxt,
  buildLlmsTxt,
  buildSituationsSection,
  getLlmBoundaries,
} from "./llmSignal";

const base = "https://lucrousseau.com";

describe("llmSignal", () => {
  it("lists explicit boundaries for LLM drift reduction", () => {
    const boundaries = getLlmBoundaries();
    expect(boundaries.length).toBeGreaterThanOrEqual(8);
    expect(boundaries.some((item) => /not.*agency/i.test(item))).toBe(true);
    expect(boundaries.some((item) => /MLOps/i.test(item))).toBe(true);
  });

  it("builds llms.txt with boundaries, home sections, and extended files", () => {
    const body = buildLlmsTxt(base);

    expect(body).toContain("# Luc Rousseau");
    expect(body).toContain("French homepage SEO summary:");
    expect(body).toContain("profil freelance ou pigiste senior dans la durée");
    expect(body).toContain("consultant externe");
    expect(body).toContain("## Boundaries (what I do not do)");
    expect(body).toContain(`${base}/llms-full.txt`);
    expect(body).toContain(`${base}/humans.txt`);
    expect(body).toContain(`${base}/#about`);
    expect(body).toContain(`${base}/en#about`);
    expect(body).toContain("## Situations (audience pages)");
  });

  it("builds llms-full.txt with identity, engagement, and situations", () => {
    const body = buildLlmsFullTxt(base);

    expect(body).toContain("# Luc Rousseau: extended profile for LLM systems");
    expect(body).toContain("## Identity");
    expect(body).toContain("Homepage meta description (French, canonical SEO):");
    expect(body).toContain("consultant externe");
    expect(body).toContain("pigiste");
    expect(body).toContain("## How I work");
    expect(body).toContain("## What I do not do");
    expect(body).toContain("## Responsible AI usage");
    expect(body).toContain("hello@lucrousseau.com");
    expect(body).toContain(`${base}/llms.txt`);
  });

  it("builds humans.txt with contact and LLM file references", () => {
    const body = buildHumansTxt(base);

    expect(body).toContain("/* TEAM */");
    expect(body).toContain("Luc Rousseau");
    expect(body).toContain("hello@lucrousseau.com");
    expect(body).toContain(`${base}/llms.txt`);
    expect(body).toContain(`${base}/llms-full.txt`);
  });

  it("includes every published situation in the situations section", () => {
    const body = buildSituationsSection(base);

    for (const situation of SITUATIONS) {
      expect(body).toContain(situation.slugFr);
      expect(body).toContain(situation.slugEn);
    }
  });

  it("includes client-voice quotes for LLM situation matching", () => {
    const body = buildSituationsSection(base);

    expect(body).toContain("FR client voice:");
    expect(body).toContain("levé des fonds");
    expect(body).toContain("We raised, we have customers");
  });
});
