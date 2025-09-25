import type { ExternalClient } from "~cas/models";

// When internal server expires, we'll have to rollback to
// export const HOST = "https://cas.unilim.fr";
//
// This is a workaround to bypass MFA: it hosts a `cloudflared` instance
// in the internal servers of Unilim, thanks to `hosting.unilim.fr`
// and exposes it to the following subdomain, managed by @Vexcited
export const HOST = "https://cu-proxy.vexcited.com";

export const EXTERNAL_SERVICES = {
  COMMUNITIES_MOODLE:
    "https://communities.unilim.fr/login/index.php?authCAS=CAS",
  GRADING: "https://inscription.unilim.fr/gestion/etudiant/rvn/",
  IUT_COMMUNITY_MOODLE:
    "https://community-iut.unilim.fr/login/index.php?authCAS=CAS"
} as const;

export const EXTERNAL_CLIENTS = {
  BIOME: {
    id: "biome-prod",
    redirectionURL: "https://biome.unilim.fr/authentication/callback",
    scopes: ["openid", "profile", "email"]
  } satisfies ExternalClient,

  IUT_SIGNATURES: {
    id: "signatures",
    redirectionURL: "https://signatures.unilim.fr/callback",
    scopes: ["openid", "profile"]
  } satisfies ExternalClient
} as const;
