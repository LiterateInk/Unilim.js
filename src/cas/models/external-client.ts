export type ExternalClient = Readonly<{
  id: string
  scopes: string[]
  redirectionURL: string
}>;
