import { cas_login, cas_oauth2_authorize, cas_oauth2_token, get_moodle_courses, login_check } from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const cas_token = await cas_login(credentials.username, credentials.password);
  const code = await cas_oauth2_authorize(cas_token);
  const { access_token } = await cas_oauth2_token(code);
  const { token } = await login_check(access_token);

  // Get Moodle courses from Biome API.
  const courses = await get_moodle_courses(token, true);
  console.log(courses);
}();
