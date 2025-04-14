import * as cas from "~/cas";
import * as signatures from "~/iut/signatures";

import { credentials } from "../../_credentials";

void async function main () {
  const state = await signatures.createAuthorizeClientState();

  // we authenticate to the CAS.
  const cookie = await cas.login(credentials.username, credentials.password);

  // we generate a ticket URL for an external service.
  const callbackURL = await cas.authorize(cookie, cas.EXTERNAL_CLIENTS.IUT_SIGNATURES, state);

  // TODO
}();
