import type { Profile } from "./models";
import { base64nopad } from "@scure/base";
import { HeaderKeys, HttpRequest, HttpRequestMethod, send } from "schwi";
import { type CAS, OAuth2 } from "~cas";

export * from "./models";

export class Biome {
  public static readonly oauth2: OAuth2 = new OAuth2("biome-prod", "https://biome.unilim.fr/authentication/callback", ["openid", "profile", "email"]);
  private static readonly HOST = "https://apis.unilim.fr";

  public get roles(): Array<string> {
    return this._dtoken.roles;
  }

  public set token(token: string) {
    this._token = token;
    this._dtoken = JSON.parse(new TextDecoder().decode(base64nopad.decode(token.split(".")[1])));
  }

  /**
   * Access token to Biome APIs,
   * sadly we can't refresh this token.
   */
  public get token(): string {
    return this._token;
  }

  public get username(): string {
    return this._dtoken.username;
  }

  private _dtoken!: { roles: Array<string>; username: string };
  private _token!: string;

  public constructor(token: string) {
    this.token = token;
  }

  public static async fromCAS(cas: CAS): Promise<Biome> {
    const callback = await cas.authorize(Biome.oauth2, true);
    const { access_token: oAuthToken } = await cas.tokenize(callback, Biome.oauth2, true);

    const request = new HttpRequest.Builder(Biome.HOST + "/api/login_check")
      .setMethod(HttpRequestMethod.POST)
      .setHeader("X-Auth-Token", oAuthToken)
      .build();

    const response = await send(request);

    const json = await response.toJSON<(
      | { code: number; message: string }
      | { token: string }
    )>();

    if ("code" in json) {
      throw new Error(json.message);
    }

    return new Biome(json.token);
  }

  public async profile(): Promise<Profile> {
    const request = new HttpRequest.Builder(Biome.HOST + "/api/profile/" + this.username)
      .setHeader(HeaderKeys.AUTHORIZATION, `Bearer ${this.token}`)
      .build();

    const response = await send(request);

    if (response.status !== 200) {
      switch (response.status) {
        case 401:
          throw new Error("invalid access token");
        case 403:
          throw new Error(`not allowed to access profile`);
        case 404:
          throw new Error(`profile does not exist`);
        default:
          throw new Error("unknown error while fetching profile");
      }
    }

    return response.toJSON();
  }
}
