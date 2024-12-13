import { defaultFetcher, type Fetcher, getHeaderFromResponse } from "@literate.ink/utilities";
import { HOST, EXTERNAL_SERVICES } from "~cas/constants";

/**
 * @param cookie can be retrieved using `login` function.
 * @param service URL to authenticate to.
 * @returns the URL to authenticate to said service.
 */
export const service = async (cookie: string, service: typeof EXTERNAL_SERVICES[keyof typeof EXTERNAL_SERVICES], fetcher: Fetcher = defaultFetcher): Promise<string> => {
  const url = new URL(HOST + "/cas/login");
  url.searchParams.set("service", service);
  url.searchParams.set("gateway", "true");

  const response = await fetcher({
    url,
    headers: { Cookie: `lemonldap=${cookie}` },
    redirect: "manual"
  });

  const redirection = getHeaderFromResponse(response, "location");
  if (!redirection) throw new Error("No redirection found.");

  return redirection;
};
