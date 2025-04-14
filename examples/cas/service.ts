import { cas } from "unilim";
import { credentials } from "../_credentials";

void async function main () {
  // 1. we authenticate to the CAS.
  const cookie = await cas.login(credentials.username, credentials.password);

  // 2. we generate a ticket URL for an external service.
  const ticket = await cas.service(cookie, cas.EXTERNAL_SERVICES.COMMUNITIES_MOODLE);

  console.log(ticket);
}();
