export class NoCasToken extends Error {
  public constructor() {
    super("no cas token");
    this.name = "NoCasToken";
  }
}
