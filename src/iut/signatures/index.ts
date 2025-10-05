import { defaultFetcher, type Fetcher, getHeaderFromResponse } from "@literate.ink/utilities";

import { HOST } from "./constants";

export const createAuthorizeClientState = async (fetcher: Fetcher = defaultFetcher): Promise<string> => {
  const response = await fetcher({
    redirect: "manual",
    url: new URL(`${HOST}/login`)
  });

  const location = getHeaderFromResponse(response, "location");
  if (!location) throw new Error("no location found");

  const url = new URL(location);

  const state = url.searchParams.get("state");
  if (!state) throw new Error("no state found");

  return state;
};
