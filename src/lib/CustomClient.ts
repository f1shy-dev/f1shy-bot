import { BotSettings, PrismaClient } from "@prisma/client";
import { SapphireClient } from "@sapphire/framework";
import { ClientOptions } from "discord.js";
import { getGuildSettings } from "./GetSettings";
import { join } from "path";
import "@sapphire/plugin-api/register";

export class CustomClient extends SapphireClient {
  public db = new PrismaClient();
  public settings: BotSettings | null;

  constructor(
    db: PrismaClient,
    settings: BotSettings | null,
    options?: ClientOptions
  ) {
    const isDev = process.env.NODE_ENV === "development";
    const port = Number(process.env.WEB_PORT || 3000);
    super({
      caseInsensitiveCommands: true,
      fetchPrefix: async (message) => {
        const guildID = message.guild?.id;
        if (!guildID) return this.settings?.defaultPrefix ?? null;

        const guildSettings = await getGuildSettings(db, guildID);
        return (guildSettings?.prefix || this.settings?.defaultPrefix) ?? null;
      },
      api: {
        listenOptions: {
          port,
        },
        auth: {
          id: process.env.CLIENT_ID || "69",
          secret: process.env.CLIENT_SECRET || "",
          scopes: ["identify", "guilds"],
          redirect: isDev
            ? `localhost:${port}/oauth/callback`
            : "https://bot.f1sh.me/oauth/callback",
          domainOverwrite: isDev ? `localhost:${port}` : "https://bot.f1sh.me",
          cookie: "DISCORD_AUTH",
        },
        prefix: "/",
        origin: "*",
      },
      ...options,
    });

    this.db = db;
    this.settings = settings;
  }

  public async login(token = process.env.DISCORD_TOKEN) {
    await this.db.$connect();
    return super.login(token);
  }
}
