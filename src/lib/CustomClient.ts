import { PrismaClient } from "@prisma/client";
import { SapphireClient } from "@sapphire/framework";
import { ClientOptions } from "discord.js";

export class CustomClient extends SapphireClient {
  constructor(options: ClientOptions, client: PrismaClient) {
    super(options);
    this.prisma = client;
  }
  prisma: PrismaClient;
}
