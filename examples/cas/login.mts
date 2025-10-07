import { CAS } from "unilim";

const cas = await CAS.initialize(Bun.env.USERNAME!, Bun.env.PASSWORD!);
console.log("You're now authenticated through the cookied", cas.lemonldap);

// NOTE: you can restore a session by re-using the cookie
// const cas = new CAS("lemonldap cookie value");
