import { BotSettings, GuildSettings, PrismaClient } from "@prisma/client";

export const getDefaultBotSettings = async (
  prisma: PrismaClient
): Promise<BotSettings | null> => await prisma.botSettings.findFirst();

export const getGuildSettings = async (
  prisma: PrismaClient,
  guildID: string
): Promise<GuildSettings | null> => {
  return await prisma.guildSettings.findUnique({
    where: {
      guildId: guildID,
    },
    select: {
      prefix: true,
      advancedErrors: true,
      guildId: true,
    },
  });
};
