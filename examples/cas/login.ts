import { credentials } from "../_credentials";
import * as cas from "~/cas";

void async function main () {
  // 1. we authenticate to the CAS.
  const cookie = await cas.login(credentials.username, credentials.password);

  // 2. we authorize an external client, here we choose BIOME.
  const code = await cas.authorize(cookie, cas.EXTERNAL_CLIENTS.BIOME);
  const token = await cas.tokenize(code, cas.EXTERNAL_CLIENTS.BIOME);

  // 3. we get the user information from the CAS (not from BIOME!)
  const user = await cas.user(token);
  console.log(`Hello, ${user.name} <${user.email}> !`);
}();
