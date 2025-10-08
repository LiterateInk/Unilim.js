import { CAS } from "unilim/cas";
import { Signatures } from "unilim/iut/signatures";

const cas = await CAS.initialize(Bun.env.USERNAME!, Bun.env.PASSWORD!);
const signatures = await Signatures.fromCAS(cas);

console.log(signatures.session);
