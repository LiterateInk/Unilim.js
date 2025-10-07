import { OAuth2 } from "../cas/models";

export class Signatures {
  public static readonly HOST = "https://signatures.unilim.fr";
  public static readonly oauth2 = new OAuth2("signatures", "https://signatures.unilim.fr/callback", ["openid", "profile", "email"]);
}
