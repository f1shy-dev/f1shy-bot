import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import "reflect-metadata";
import { CustomClient } from "./structures/CustomClient";
config();

(async () => {
  const prisma = new PrismaClient();
  const settings = await prisma.botSettings.findFirst();

  const client = new CustomClient(prisma, settings);
  await client.login();
})();
