import { CAS, Services } from "unilim/cas";
import { Signatures } from "unilim/iut/signatures";

void (async function main() {
  const cas = await CAS.initialize(Bun.env.USERNAME!, Bun.env.PASSWORD!);
  const signatures = await Signatures.fromCAS(cas);

  console.log(signatures.session);
}());
