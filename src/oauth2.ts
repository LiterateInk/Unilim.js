export type Tokens = Readonly<{
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  token_type: "Bearer";
}>;

export class OAuth2 {
  public constructor(
    public identifier: string,
    public callback: string,
    public scopes: Array<string>
  ) {}
}
