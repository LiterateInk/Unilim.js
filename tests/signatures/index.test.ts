import { describe, expect, it } from "bun:test";
import { Signatures } from "src/iut/signatures";

describe("iut/signatures", () => {
  it("should have correct host property", () => {
    expect(Signatures.HOST).toBe("https://signatures.unilim.fr");
  });

  it("should have correct oauth2 identifiers", () => {
    expect(Signatures.oauth2.identifier).toBe("signatures");
    expect(Signatures.oauth2.callback).toBe("https://signatures.unilim.fr/callback");
    expect(Signatures.oauth2.scopes).toEqual(["openid", "profile"]);
  });
});
