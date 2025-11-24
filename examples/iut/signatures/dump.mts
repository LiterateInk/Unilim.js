import { CAS } from "unilim/cas";
import { Signatures } from "unilim/iut/signatures";

const cas = await CAS.restore(
  Bun.env.USERNAME!, Bun.env.PASSWORD!,
  Bun.env.CONNECTION!, Bun.env.KEY!
);

let signatures = await Signatures.fromCAS(cas);

// You can now build as much instance of `Signatures` as you want,
// using the session cookie! You don't need the CAS anymore!
signatures = new Signatures(signatures.session);

// const html = await signatures.getHtml();  < Retrieve HTML from Signatures.
// const card = Signatures.parse(html);      < Parse card from HTML.
//
// The following method is a contraction of these two methods.
const card = await signatures.dump();

console.log(`Welcome ${card.fullName}, you're in ${card.promotion}!`);

for (const semester of card.semesters) {
  console.log(">", semester.name, "have", semester.units.length, "units");
}
