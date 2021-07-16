import { PrismaClient } from "@prisma/client";

export const getDefaultBotSettings = async (prisma: PrismaClient) =>
  await prisma.botSettings.findFirst();

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
