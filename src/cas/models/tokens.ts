export type Tokens = Readonly<{
  refresh_token: string
  access_token: string
  id_token: string
  token_type: "Bearer"
  expires_in: number
}>;
