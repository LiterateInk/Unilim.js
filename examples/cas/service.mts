import { CAS, Services } from "unilim/cas";

const cas = await CAS.initialize(Bun.env.USERNAME!, Bun.env.PASSWORD!);
const ticket = await cas.service(Services.CommunityIut);

// > https://community-iut.unilim.fr/login/index.php?authCAS=CAS&ticket=ST-XXXXX
console.log(ticket.href);
