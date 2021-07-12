import { SapphireClient } from "@sapphire/framework";
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { config } from "dotenv";
import "reflect-metadata";
config();

const prisma = new PrismaClient();
const client = new SapphireClient({
  defaultPrefix: "f.",
  caseInsensitiveCommands: true,
  baseUserDirectory: __dirname,
});

client.login(process.env.DISCORD_TOKEN);
