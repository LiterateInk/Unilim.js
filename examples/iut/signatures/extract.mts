import { CAS } from "unilim/cas";
import { Signatures } from "unilim/iut/signatures";

const cas = await CAS.restore(
  Bun.env.USERNAME!, Bun.env.PASSWORD!,
  Bun.env.CONNECTION!, Bun.env.KEY!
);

const signatures = await Signatures.fromCAS(cas);

console.log(signatures.session);
