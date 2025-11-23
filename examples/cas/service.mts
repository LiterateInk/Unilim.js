import { CAS, Services } from "unilim/cas";

const cas = await CAS.restore(
  Bun.env.USERNAME!, Bun.env.PASSWORD!,
  Bun.env.CONNECTION!, Bun.env.KEY!
);

const ticket = await cas.service(Services.CommunityIut);

// > https://community-iut.unilim.fr/login/index.php?authCAS=CAS&ticket=ST-XXXXX
console.log(ticket.href);
