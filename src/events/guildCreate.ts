import { Event, PieceContext } from "@sapphire/framework";
import { Guild } from "discord.js";
import { CustomClient } from "../lib/CustomClient";

export default class GuildCreateEvent extends Event {
  constructor(context: PieceContext) {
    super(context, {
      once: true,
    });
  }

  async run(guild: Guild): Promise<void> {
    const prisma = (this.context.client as CustomClient).prisma;
    const admins = (await prisma.user.findUnique({
      where: { id: guild.ownerID },
    }))
      ? { connect: [{ id: guild.ownerID }] }
      : {
          create: {
            id: guild.ownerID,
            isBotOwner: false,
          },
        };

    await prisma.guild.create({
      data: {
        id: guild.id,
        admins,
        settings: {
          create: {
            prefix: process.env.DEFAULT_PREFIX,
            advancedErrors: false,
          },
        },
      },
    });
    this.context.logger.info("[INFO] Joined guild: " + guild.name);
  }
}