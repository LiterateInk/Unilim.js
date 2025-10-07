import { Biome, CAS } from "unilim";

const cas = await CAS.initialize(Bun.env.USERNAME!, Bun.env.PASSWORD!);
const biome = await Biome.fromCAS(cas);

const profile = await biome.profile();
console.dir(profile, { depth: Infinity });
