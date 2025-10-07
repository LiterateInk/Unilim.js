import { OAuth2 } from "./oauth2";

export class Signatures {
  public static readonly oauth2 = new OAuth2("signatures", "https://signatures.unilim.fr/callback", ["openid", "profile", "email"]);
}
