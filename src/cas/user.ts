import { defaultFetcher, type Fetcher } from "@literate.ink/utilities";
import type { Tokens, User } from "~cas/models";
import { HOST } from "~cas/constants";

/**
 * gets user information from the CAS
 * @param tokens comes from the `cas.tokenize` function
 */
export const user = async (tokens: Tokens, fetcher: Fetcher = defaultFetcher): Promise<User> => {
  const response = await fetcher({
    url: new URL(HOST + "/oauth2/userinfo"),
    headers: { Authorization: `Bearer ${tokens.access_token}` }
  });

  if (response.status !== 200)
    throw new Error("invalid access token");

  return JSON.parse(response.content);
};
