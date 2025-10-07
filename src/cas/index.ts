// export * from "./authorize";
// export * from "./constants";
// export * from "./login";
// export * from "./service";
// export * from "./tokenize";
// export * from "./user";

import { HttpRequest, HttpRequestMethod, HttpRequestRedirection, send } from "schwi";

export class CAS {
  private static readonly COOKIE = "lemonldap";

  // URL is a workaround to bypass MFA: it hosts a `cloudflared` instance
  // using the internal hosting services that proxies `cas.unilim.fr`.
  private static readonly HOST = "https://cu-proxy.vexcited.com";

  public constructor(
    /**
     * An authenticated session cookie.
     */
    public readonly lemonldap: string
  ) {}

  /**
   * Authenticates through the CAS with the given
   * `username` and `password`.
   */
  public static async initialize(username: string, password: string): Promise<CAS> {
    const token = await this.getTokenCSRF();

    const body = new URLSearchParams({
      password,
      token,
      // -> btoa("https://cas.unilim.fr/cas")
      url: "aHR0cHM6Ly9jYXMudW5pbGltLmZyL2Nhcw==",
      user: username
    });

    const request = new HttpRequest.Builder(this.HOST)
      .setMethod(HttpRequestMethod.POST)
      .setFormUrlEncodedBody(body)
      .setRedirection(HttpRequestRedirection.MANUAL)
      .build();

    const response = await send(request);

    const cookies = response.headers.getSetCookie();
    const cookie = cookies.find((cookie) => cookie.startsWith(this.COOKIE + "="));

    if (!cookie) throw new Error("bad authentication");
    const lemonldap = cookie.split(";")[0].split("=")[1];
    return new CAS(lemonldap);
  }

  /**
   * Tries to retrieve the CSRF token from the CAS login portal.
   *
   * It retries 5 times before failing: sometimes an information
   * page is shown and we need to refresh the page to dismiss it.
   */
  private static async getTokenCSRF(retries = 0): Promise<string> {
    const request = new HttpRequest.Builder(this.HOST).build();
    const response = await send(request);

    const $ = await response.toHTML();
    const token = $("input#token").attr("value");

    if (!token) {
      if (retries < 5) {
        return this.getTokenCSRF(retries + 1);
      }

      throw new Error("CAS token not found in HTML");
    }

    return token;
  }
}
