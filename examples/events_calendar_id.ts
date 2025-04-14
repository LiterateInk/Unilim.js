import { cas_login, cas_oauth2_authorize, cas_oauth2_token, get_events_by_calendar_id, login_check } from "../src/cas";
import { credentials } from "./_credentials";

const CALENDAR_ID = "";

void async function main () {
  const cas_token = await cas_login(credentials.username, credentials.password);
  const code = await cas_oauth2_authorize(cas_token);
  const { access_token } = await cas_oauth2_token(code);
  const { token } = await login_check(access_token);

  const events = await get_events_by_calendar_id(token, {
    calendar_id: CALENDAR_ID,
    dend: new Date("2024-06-30"),
    dstart: new Date("2024-05-27")
  });

  console.log(events);
}();
