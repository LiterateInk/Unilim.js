import { CAS_EXTERNAL_SERVICES, cas_login, cas_service } from "../src";
import { credentials } from "./_credentials";

/**
 * In this example, we'll see how we can get a ticket for an external service.
 * An external service is like a Moodle instance, a calendar, or a forum.
 *
 * We'll use the CAS to get those tickets.
 */
void async function main () {
  // 1. get an authenticated token from the CAS.
  const cas_token = await cas_login(credentials.username, credentials.password);

  // 2. let's get a ticket for any service inside "CAS_EXTERNAL_SERVICES" constant.
  const iut_moodle_ticket = await cas_service(cas_token, CAS_EXTERNAL_SERVICES.IUT_COMMUNITY_MOODLE);
  console.log(iut_moodle_ticket);
}();

