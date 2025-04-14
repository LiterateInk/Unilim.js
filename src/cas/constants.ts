import type { ExternalClient } from "~cas/models";

export const HOST = "https://cas.unilim.fr";

export const EXTERNAL_SERVICES = {
  COMMUNITIES_MOODLE: "https://communities.unilim.fr/login/index.php?authCAS=CAS",
  GRADING: "https://inscription.unilim.fr/gestion/etudiant/rvn/",
  IUT_COMMUNITY_MOODLE: "https://community-iut.unilim.fr/login/index.php?authCAS=CAS"
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

