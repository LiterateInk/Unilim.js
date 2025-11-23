import { Biome } from "unilim/biome";
import { CAS } from "unilim/cas";

const cas = await CAS.restore(
  Bun.env.USERNAME!, Bun.env.PASSWORD!,
  Bun.env.CONNECTION!, Bun.env.KEY!
);

const biome = await Biome.fromCAS(cas);

const profile = await biome.profile();
console.dir(profile, { depth: Infinity });
