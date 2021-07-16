import { BotSettings, PrismaClient } from "@prisma/client";
import { SapphireClient } from "@sapphire/framework";
import { ClientOptions } from "discord.js";
import { getGuildSettings } from "../lib/GetSettings";
import { join } from "path";
import "@sapphire/plugin-api/register";

export class CustomClient extends SapphireClient {
  public db: PrismaClient;
  public settings: BotSettings | null;

  constructor(
    db: PrismaClient,
    settings: BotSettings | null,
    options?: ClientOptions
  ) {
    const webURL =
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000`
        : process.env.WEB_URL;

    super({
      caseInsensitiveCommands: true,
      fetchPrefix: async (message) => {
        const guildID = message.guild?.id;
        if (!guildID) return this.settings?.defaultPrefix ?? null;

        const guildSettings = await getGuildSettings(db, guildID);
        return (guildSettings?.prefix || this.settings?.defaultPrefix) ?? null;
      },
      defaultPrefix: settings?.defaultPrefix,
      baseUserDirectory: join(__dirname, "../"),
      api: {
        listenOptions: {
          port: 4000,
        },
        auth: {
          id: process.env.CLIENT_ID || "69",
          secret: process.env.CLIENT_SECRET || "",
          scopes: ["identify", "guilds"],
          redirect: webURL + "/oauth/callback",
          domainOverwrite: webURL,
          cookie: "SAPPHIRE_AUTH",
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
