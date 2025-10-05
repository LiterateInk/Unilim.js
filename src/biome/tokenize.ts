import { defaultFetcher, type Fetcher } from "@literate.ink/utilities";
import { API_ENDPOINT } from "./constants";

/**
 * @returns a token to use for the Biome API
 */
export const tokenize = async (tokenCAS: string, fetcher: Fetcher = defaultFetcher): Promise<string> => {
  const response = await fetcher({
    headers: { "X-Auth-Token": tokenCAS },
    method: "POST",
    url: new URL(`${API_ENDPOINT}/api/login_check`)
  });

  const json = JSON.parse(response.content) as (
    // success
    | { code: number; message: string }
    // error, probably unauthorized
    | { token: string }
  );

  if ("code" in json) {
    throw new Error(json.message);
  }

  return json.token;
};
