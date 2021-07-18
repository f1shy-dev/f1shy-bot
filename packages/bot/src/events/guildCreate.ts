import { Event, PieceContext } from "@sapphire/framework";
import { Guild } from "discord.js";
import { CustomClient } from "../structures/CustomClient";

export default class GuildCreateEvent extends Event {
  constructor(context: PieceContext) {
    super(context);
  }

  async run(guild: Guild): Promise<void> {
    const prisma = (this.context.client as CustomClient).db;
    const admins = (await prisma.user.findUnique({
      where: { id: guild.ownerId },
    }))
      ? { connect: [{ id: guild.ownerId }] }
      : {
        create: {
          id: guild.ownerId,
          isBotOwner: false,
        },
      };

    await prisma.guild.create({
      data: {
        id: guild.id,
        admins,
        settings: {
          create: {
            prefix: (this.context.client as CustomClient).settings
              ?.defaultPrefix,
            advancedErrors: false,
          },
        },
      },
    });
    this.context.logger.info("[INFO] Joined guild: " + guild.name);
  }
}
