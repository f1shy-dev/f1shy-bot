import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import "reflect-metadata";
import { CustomClient } from "./lib/CustomClient";
import { getDefaultBotSettings, getGuildSettings } from "./lib/GetSettings";
config();

(async () => {
  const prisma = new PrismaClient();
  const defaultSettings = await getDefaultBotSettings(prisma);

  const client = new CustomClient(
    {
      defaultPrefix: defaultSettings?.defaultPrefix,
      caseInsensitiveCommands: true,
      baseUserDirectory: __dirname,
      fetchPrefix: async (message) => {
        const guildID = message.guild?.id;
        if (!guildID) return defaultSettings?.defaultPrefix ?? null;

        const guildSettings = await getGuildSettings(prisma, guildID);
        return (
          (guildSettings?.prefix || defaultSettings?.defaultPrefix) ?? null
        );
      },
    },
    prisma
  );

  client.login(process.env.DISCORD_TOKEN);
})();
