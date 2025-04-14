import * as biome from "~/biome";
import * as cas from "~/cas";

import { credentials } from "../_credentials";

void async function main () {
  // we authenticate to the CAS.
  const cookie = await cas.login(credentials.username, credentials.password);

  // we authorize the biome client
  const callbackURL = await cas.authorize(cookie, cas.EXTERNAL_CLIENTS.BIOME);

  // we get CAS tokens from the biome authorization.
  const tokensCAS = await cas.tokenize(callbackURL, cas.EXTERNAL_CLIENTS.BIOME);

  // we get an access token for biome using the CAS access token.
  const token = await biome.tokenize(tokensCAS.access_token);

  // we get the user profile from biome.
  const profile = await biome.profile(token, credentials.username);

  // let's display the raw data, it's a lot of information!
  console.dir(profile, { depth: Infinity });
}();
