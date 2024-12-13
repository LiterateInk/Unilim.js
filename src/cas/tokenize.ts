import { defaultFetcher, type Fetcher } from "@literate.ink/utilities";
import type { ExternalClient, Tokens } from "~cas/models";
import { HOST } from "~cas/constants";

export const tokenize = async (code: string, client: ExternalClient, fetcher: Fetcher = defaultFetcher): Promise<Tokens> => {
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
