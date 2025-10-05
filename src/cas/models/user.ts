export type User = Readonly<{
  email: string;
  family_name: string;
  given_name: string;
  /** Family name and given name combined. */
  name: string;
  /** Username used to authenticate. */
  sub: string;
}>;
