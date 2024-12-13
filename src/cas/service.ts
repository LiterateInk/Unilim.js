import { HOST, EXTERNAL_SERVICES } from "./constants";

/**
 * @param cookie can be retrieved using `login` function.
 * @param service URL to authenticate to.
 * @returns the URL to authenticate to said service.
 */
export const service = async (cookie: string, service: typeof EXTERNAL_SERVICES[keyof typeof EXTERNAL_SERVICES]): Promise<string> => {
  const uri = new URL(HOST + "/cas/login");
  uri.searchParams.set("service", service);
  uri.searchParams.set("gateway", "true");

  const response = await fetch(uri.href, {
    headers: { "Cookie": "lemonldap=" + cookie },
    redirect: "manual"
  });

  const redirection = response.headers.get("location");
  if (!redirection) throw new Error("No redirection found.");

  return redirection;
};
