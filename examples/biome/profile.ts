import { credentials } from "../_credentials";

import * as cas from "~/cas";
import * as biome from "~/biome";

void async function main () {
  // 1. we authenticate to the CAS.
  const cookie = await cas.login(credentials.username, credentials.password);

  // 2. we authorize an external client, here we choose BIOME.
  const code = await cas.authorize(cookie, cas.EXTERNAL_CLIENTS.BIOME);
  const tokensCAS = await cas.tokenize(code, cas.EXTERNAL_CLIENTS.BIOME);

  // 3. we get the biome token using the CAS token.
  const token = await biome.tokenize(tokensCAS.access_token);

  // 4. we get the user profile from the biome.
  const profile = await biome.profile(token, credentials.username);

  // let's display the raw data, it's a lot of information!
  console.dir(profile, { depth: Infinity });
}();
