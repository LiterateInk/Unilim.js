export type ExternalClient = Readonly<{
  id: string;
  redirectionURL: string;
  scopes: string[];
}>;
