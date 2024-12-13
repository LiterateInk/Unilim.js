import { CAS_HOST } from "~/utils/constants";
import { type Fetcher, defaultFetcher, findValueBetween, getCookiesFromResponse } from "@literate.ink/utilities";

const retrieveLoginToken = async (fetcher: Fetcher, retries = 0): Promise<string> => {
  const response = await fetcher({
    url: new URL(CAS_HOST)
  });

  // find the token that allows to send the login request.
  const token = findValueBetween(response.content, "name=\"token\" value=\"", "\" />");

  if (!token) {
    // we retry 5 times before throwing the actual error.
    if (retries < 5) {
      return retrieveLoginToken(fetcher, retries + 1);
    }

    throw new Error("CAS token not found in HTML");
  }

  return token;
};

/**
 * authenticates to `https://cas.unilim.fr` using the given `username` and `password`.
 * @returns the `lemonldap` cookie that is a token for further authenticated requests.
 */
export const login = async (username: string, password: string, fetcher: Fetcher = defaultFetcher): Promise<string> => {
  const token = await retrieveLoginToken(fetcher);

  // send the login request.
  const response = await fetcher({
    url: new URL(CAS_HOST),
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    content: new URLSearchParams({
      url: "aHR0cHM6Ly9jYXMudW5pbGltLmZyL2Nhcw==", // -> btoa("https://cas.unilim.fr/cas")
      token,
      user: username,
      password
    }).toString(),
    // prevent redirections to any random page
    // since we need to read the "set-cookie" from THIS response.
    redirect: "manual"
  });

  // read the "lemonldap" cookie from the response.
  const cookies = getCookiesFromResponse(response);
  const lemonCookie = cookies[0].split("=")[1];

  if (!lemonCookie)
    throw new Error("bad authentication");

  return lemonCookie;
};
