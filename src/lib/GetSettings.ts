import { PrismaClient } from "@prisma/client";

export const getDefaultBotSettings = async (prisma: PrismaClient) => {
  return await prisma.botSettings.findFirst({
    select: {
      defaultPrefix: true,
      defaultAdvancedErrors: true,
      botOwnerID: true,
    },
  });
};

export const getGuildSettings = async (
  prisma: PrismaClient,
  guildID: string
) => {
  return await prisma.guildSettings.findUnique({
    where: {
      guildId: guildID,
    },
    select: {
      prefix: true,
      advancedErrors: true,
    },
  });
};
