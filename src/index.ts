import { SapphireClient } from "@sapphire/framework";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import "reflect-metadata";
config();

const prisma = new PrismaClient();
const client = new SapphireClient({
  defaultPrefix: process.env.DEFAULT_PREFIX,
  caseInsensitiveCommands: true,
  baseUserDirectory: __dirname,
});

client.login(process.env.DISCORD_TOKEN);
