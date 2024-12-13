import type { ExternalClient } from "./models";

export const HOST = "https://cas.unilim.fr";

export const EXTERNAL_SERVICES = {
  IUT_COMMUNITY_MOODLE: "https://community-iut.unilim.fr/login/index.php?authCAS=CAS",
  IUT_SIGNATURES: "https://signatures.unilim.fr/",

  COMMUNITIES_MOODLE: "https://communities.unilim.fr/login/index.php?authCAS=CAS",
  GRADING: "https://inscription.unilim.fr/gestion/etudiant/rvn/"
} as const;

export const EXTERNAL_CLIENTS = {
  BIOME: {
    id: "biome-prod",
    scopes: ["openid", "profile", "email"],
    redirectionURL: "https://biome.unilim.fr/authentication/callback"
  } satisfies ExternalClient
} as const;

