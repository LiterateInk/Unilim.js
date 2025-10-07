export class OAuth2 {
  public constructor(
    public identifier: string,
    public callback: string,
    public scopes: Array<string>
  ) {}
}
