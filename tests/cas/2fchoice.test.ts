import { describe, expect, it } from "bun:test";
import { load } from "cheerio";

import { PendingAuth } from "src/cas";
import html from "./2fchoice.html" with { type: "text" };

const document = load(html as unknown as string);

describe("cas::2fchoice", () => {
  it("is not solved", () => {
    const auth = new PendingAuth(document);
    expect(auth.solved).toBe(false);
  });

  it("has email option", () => {
    const auth = new PendingAuth(document);
    expect(auth.isEmailAvailable).toBe(true);
  });

  it("has totp option", () => {
    const auth = new PendingAuth(document);
    expect(auth.isTotpAvailable).toBe(true);
  });
});
