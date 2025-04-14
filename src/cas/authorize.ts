import type { ExternalClient } from "~cas/models";

import { defaultFetcher, type Fetcher, getHeaderFromResponse } from "@literate.ink/utilities";
import { HOST } from "~cas/constants";

/**
 * Does all the steps to authorize a user
 * using `/oauth2/authorize` endpoint.
 *
 * @param cookie token that can be found using `login` function.
 * @returns callback URL with filled information.
 */
export const authorize = async (cookie: string, client: ExternalClient, state = "", fetcher: Fetcher = defaultFetcher): Promise<URL> => {
  const url = new URL(HOST + "/oauth2/authorize");
  url.searchParams.set("redirect_uri", client.redirectionURL);
  url.searchParams.set("client_id", client.id);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", client.scopes.join(" "));
  url.searchParams.set("code_challenge_method", "plain");
  url.searchParams.set("code_challenge", "literateink");
  url.searchParams.set("state", state);

  const response = await fetcher({
    headers: { Cookie: `lemonldap=${cookie}` },
    redirect: "manual",
    url
  });

  const redirection = getHeaderFromResponse(response, "location");
  if (!redirection) throw new Error("no redirection found");

  return new URL(redirection);
};
