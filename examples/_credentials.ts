import { config } from "dotenv";
import { join } from "node:path";
// Load the `.env` file configuration.
config({ path: join(__dirname, ".env") });

if (!process.env.BIOME_USERNAME || !process.env.BIOME_PASSWORD) {
  throw new Error("You need to provide credentials in the `.env` file.");
}

export const credentials = {
  password: process.env.BIOME_PASSWORD,
  username: process.env.BIOME_USERNAME
};
