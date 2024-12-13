import { defaultFetcher, type Fetcher } from "@literate.ink/utilities";
import { API_ENDPOINT } from "~biome/constants";

/**
 * @returns a token to use for the Biome API
 */
export const tokenize = async (tokenCAS: string, fetcher: Fetcher = defaultFetcher): Promise<string> => {
  const response = await fetcher({
    url: new URL(`${API_ENDPOINT}/api/login_check`),
    headers: { "X-Auth-Token": tokenCAS },
    method: "POST"
  });

  const json = JSON.parse(response.content) as (
    // success
    | { token: string }
    // error, probably unauthorized
    | { code: number, message: string }
  );

  if ("code" in json) {
    throw new Error(json.message);
  }

  return json.token;
};
