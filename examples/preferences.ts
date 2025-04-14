import { cas_login, cas_oauth2_authorize, cas_oauth2_token, login_check, preferences_by_properties } from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const cas_token = await cas_login(credentials.username, credentials.password);
  const code = await cas_oauth2_authorize(cas_token);
  const { access_token } = await cas_oauth2_token(code);
  const { token } = await login_check(access_token);

  const userApplications = await preferences_by_properties(token, "userApplications");
  const userInterface = await preferences_by_properties(token, "userInterface");
  const userShortWidgets = await preferences_by_properties(token, "userShortWidgets");
  const userWidgets = await preferences_by_properties(token, "userWidgets");

  console.log(userApplications);
  console.log("--");
  console.log(userInterface);
  console.log("--");
  console.log(userShortWidgets);
  console.log("--");
  console.log(userWidgets);
}();
