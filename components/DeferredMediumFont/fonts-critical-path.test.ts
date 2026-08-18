import { readFileSync } from "fs";
import { join } from "path";

describe("Quincy font loading", () => {
  it("keeps Medium out of the render-blocking font-face sheet", () => {
    const blocking = readFileSync(join(__dirname, "../../styles/base/_fonts.scss"), "utf8");
    expect(blocking).toContain("QuincyCF-Black");
    expect(blocking).not.toContain("QuincyCF-Medium");

    const deferred = readFileSync(join(__dirname, "../../public/fonts/quincy-medium.css"), "utf8");
    expect(deferred).toContain("QuincyCF-Medium");
    expect(deferred).toContain("font-weight: 500");
  });
});
