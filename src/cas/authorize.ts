import { defaultFetcher, type Fetcher, getHeaderFromResponse } from "@literate.ink/utilities";
import type { ExternalClient } from "./models";
import { HOST } from "./constants";

/**
 * Does all the steps to authorize a user
 * using `/oauth2/authorize` endpoint.
 *
 * @param cookie token that can be found using `login` function.
 *
 * @returns code to exchange for an access token
 * using `/oauth2/token` endpoint.
 */
export const authorize = async (cookie: string, client: ExternalClient, fetcher: Fetcher = defaultFetcher): Promise<string> => {
  let url: URL;

  url = new URL(HOST + "/oauth2/authorize");
  url.searchParams.set("redirect_uri", client.redirectionURL);
  url.searchParams.set("client_id", client.id);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", client.scopes.join(" "));
  url.searchParams.set("code_challenge_method", "plain");
  url.searchParams.set("code_challenge", "literateink");
  url.searchParams.set("state", "");

  const response = await fetcher({
    url,
    redirect: "manual",
    headers: { Cookie: `lemonldap=${cookie}` }
  });

  const redirection = getHeaderFromResponse(response, "location");
  if (!redirection) throw new Error("no redirection found");

  url = new URL(redirection);
  const code = url.searchParams.get("code");

  if (!code) throw new Error("no code found");
  return code;
};
