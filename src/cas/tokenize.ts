import type { ExternalClient, Tokens } from "./models";

import { defaultFetcher, type Fetcher } from "@literate.ink/utilities";
import { HOST } from "./constants";

export const tokenize = async (callbackURL: URL, client: ExternalClient, fetcher: Fetcher = defaultFetcher): Promise<Tokens> => {
  const code = callbackURL.searchParams.get("code");

  if (!code)
    throw new Error("no code found");

  const response = await fetcher({
    content: new URLSearchParams({
      client_id: client.id,
      code,
      code_verifier: "literateink",
      grant_type: "authorization_code",
      redirect_uri: client.redirectionURL
    }).toString(),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    url: new URL(HOST + "/oauth2/token")
  });

  return JSON.parse(response.content);
};
