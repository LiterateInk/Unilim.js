import { defaultFetcher, type Fetcher } from "@literate.ink/utilities";
import type { ExternalClient, Tokens } from "~cas/models";
import { HOST } from "~cas/constants";

export const tokenize = async (callbackURL: URL, client: ExternalClient, fetcher: Fetcher = defaultFetcher): Promise<Tokens> => {
  const code = callbackURL.searchParams.get("code");

  if (!code)
    throw new Error("no code found");

  const response = await fetcher({
    url: new URL(HOST + "/oauth2/token"),
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    content: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: client.id,
      redirect_uri: client.redirectionURL,
      code_verifier: "literateink"
    }).toString()
  });

  return JSON.parse(response.content);
};
