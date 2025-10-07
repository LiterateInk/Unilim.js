import type { OAuth2, Services, Tokens, User } from "./models";
import { HeaderKeys, HttpRequest, HttpRequestMethod, HttpRequestRedirection, send } from "schwi";

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

    const request = new HttpRequest.Builder(CAS.HOST)
      .setMethod(HttpRequestMethod.POST)
      .setFormUrlEncodedBody(body)
      .setRedirection(HttpRequestRedirection.MANUAL)
      .build();

    const response = await send(request);

    const cookies = response.headers.getSetCookie();
    const cookie = cookies.find((cookie) => cookie.startsWith(CAS.COOKIE + "="));

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
    const request = new HttpRequest.Builder(CAS.HOST).build();
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

  /**
   * Authorize an user through `/oauth2` route.
   * @returns callback URL with authentication details
   */
  public async authorize(client: OAuth2, state = ""): Promise<URL> {
    const url = new URL(CAS.HOST + "/oauth2/authorize");

    const parameters = url.searchParams;
    parameters.set("redirect_uri", client.callback);
    parameters.set("client_id", client.identifier);
    parameters.set("response_type", "code");
    parameters.set("scope", client.scopes.join(" "));
    parameters.set("code_challenge_method", "plain");
    parameters.set("code_challenge", "literateink");
    parameters.set("state", state);

    const request = new HttpRequest.Builder(url)
      .setRedirection(HttpRequestRedirection.MANUAL)
      .setCookie(CAS.COOKIE, this.lemonldap)
      .build();

    const response = await send(request);
    const location = response.headers.get("location");
    if (!location) throw new Error("location header not found");

    return new URL(location);
  }

  /**
   * Authenticates to a given service using the CAS as SSO.
   * Most of the time it'll generate a ticket URL.
   *
   * @param service service to authenticate to through CAS
   * @returns an authenticated url to said service
   */
  public async service(service: Services): Promise<URL> {
    const url = new URL(CAS.HOST + "/cas/login");

    const parameters = url.searchParams;
    parameters.set("service", service);
    parameters.set("gateway", "true");

    const request = new HttpRequest.Builder(url)
      .setRedirection(HttpRequestRedirection.MANUAL)
      .setCookie(CAS.COOKIE, this.lemonldap)
      .build();

    const response = await send(request);
    const location = response.headers.get("location");
    if (!location) throw new Error("location header not found");

    return new URL(location);
  }

  /**
   * Retrieves CAS tokens using the authorized OAuth2.0 callback URL.
   *
   * @param callback url created with {@link authorize} method
   * @param client oauth2 linked to the url
   */
  public async tokenize(callback: URL, client: OAuth2): Promise<Tokens> {
    const code = callback.searchParams.get("code");

    if (!code)
      throw new Error("no code found");

    const body = new URLSearchParams({
      client_id: client.identifier,
      code,
      code_verifier: "literateink",
      grant_type: "authorization_code",
      redirect_uri: client.callback
    });

    const request = new HttpRequest.Builder(CAS.HOST + "/oauth2/token")
      .setFormUrlEncodedBody(body)
      .setMethod(HttpRequestMethod.POST)
      .build();

    const response = await send(request);
    return response.toJSON();
  }

  /**
   * Retrieves user information from the CAS.
   *
   * @param tokens oauth2 tokens received in {@link tokenize}
   * @returns user details from CAS
   */
  public async userinfo(tokens: Tokens): Promise<User> {
    const request = new HttpRequest.Builder(CAS.HOST + "/oauth2/userinfo")
      .setHeader(HeaderKeys.AUTHORIZATION, `Bearer ${tokens.access_token}`)
      .build();

    const response = await send(request);

    if (response.status !== 200)
      throw new Error("invalid access token");

    return response.toJSON();
  }
}
