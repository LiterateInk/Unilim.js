import type { HttpResponse } from "schwi";
import { HttpRequest, HttpRequestRedirection, send } from "schwi";
import { CAS, OAuth2 } from "~cas";

export class Signatures {
  public static readonly COOKIE = "session";

  public static readonly HOST = "https://signatures.unilim.fr";
  public static readonly oauth2 = new OAuth2("signatures", "https://signatures.unilim.fr/callback", ["openid", "profile"]);

  public constructor(
    public readonly session: string
  ) {}

  public static async fromCAS(cas: CAS): Promise<Signatures> {
    let request: HttpRequest, response: HttpResponse;
    let session: string, state: string;

    {
      request = new HttpRequest.Builder(Signatures.HOST + "/login")
        .setRedirection(HttpRequestRedirection.MANUAL)
        .enableUnauthorizedTLS()
        .build();

      response = await send(request);

      const cookies = response.headers.getSetCookie();
      const cookie = cookies.find((cookie) => cookie.startsWith(Signatures.COOKIE + "="));

      if (!cookie)
        throw new Error("session cookie not found");

      session = cookie.split(";")[0].split("=")[1];

      const location = new URL(response.headers.get("location")!);
      state = location.searchParams.get("state")!;
    }

    {
      const callback = await cas.authorize(Signatures.oauth2, false, state);

      request = new HttpRequest.Builder(callback)
        .setRedirection(HttpRequestRedirection.MANUAL)
        .setCookie(Signatures.COOKIE, session)
        .setCookie(CAS.COOKIE, cas.lemonldap)
        .enableUnauthorizedTLS()
        .build();

      response = await send(request);

      const cookies = response.headers.getSetCookie();
      const cookie = cookies.find((cookie) => cookie.startsWith(Signatures.COOKIE + "="));

      if (!cookie)
        throw new Error("session cookie not found");

      session = cookie.split(";")[0].split("=")[1];
    }

    return new Signatures(session);
  }
}
