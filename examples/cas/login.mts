import { CAS } from "unilim/cas";

const auth = await CAS.initialize(
  Bun.env.USERNAME!,
  Bun.env.PASSWORD!
);

if (!auth.solved) {
  if (auth.isTotpAvailable) {
    const totp = prompt("totp>");
    if (!totp) process.exit(0);

    await auth.solveWithTotp(totp);
  }
  else if (auth.isEmailAvailable) {
    await auth.sendEmailCode();

    const code = prompt("code>");
    if (!code) process.exit(0);

    await auth.solveWithEmailCode(code);
  }
}

const cas = await auth.finish();

console.log("You're authenticated! Here's your restore auth details.");
console.log("- CONNECTION:", cas.connection);
console.log("- KEY:", cas.key);

console.log("Oh and also, here's your current session cookie.");
console.log("- COOKIE:", cas.cookie);
