import { describe, expect, it } from "bun:test";
import { Signatures } from "src/iut/signatures";
import html from "./partial.html" with { type: "text" };

describe("iut/signatures", () => {
  it("should parse correctly the report card", () => {
    const report = Signatures.parse(html as unknown as string);
  });
});
