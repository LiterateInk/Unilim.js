import type { Profile } from "~biome/models";

import { defaultFetcher, type Fetcher } from "@literate.ink/utilities";
import { API_ENDPOINT } from "~biome/constants";

export const profile = async (token: string, username: string, fetcher: Fetcher = defaultFetcher): Promise<Profile> => {
  const response = await fetcher({
    headers: { Authorization: `Bearer ${token}` },
    url: new URL(`${API_ENDPOINT}/api/profile/${username}`)
  });

  if (response.status !== 200) {
    switch (response.status) {
      case 401:
        throw new Error("invalid access token");
      case 403:
        throw new Error(`not allowed to access '${username}' profile`);
      case 404:
        throw new Error(`profile '${username}' does not exist`);
      default:
        throw new Error("unknown error while fetching profile");
    }
  }

  return JSON.parse(response.content);
};
