import { BotSettings, PrismaClient } from "@prisma/client";
import { SapphireClient, SapphireClientOptions } from "@sapphire/framework";

import { getGuildSettings } from "../lib/GetSettings";
import { join } from "path";
import "@sapphire/plugin-api/register";
import { Intents } from "discord.js";
import { RequestCache } from "./RequestCache";

export class CustomClient extends SapphireClient {
  public db: PrismaClient;
  public settings: BotSettings | null;
  public clientID: string;
  public requestCache = new RequestCache();

  constructor(
    db: PrismaClient,
    settings: BotSettings | null,
    options?: SapphireClientOptions
  ) {
    const webURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.WEB_URL;

    super({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
      ],
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
    this.clientID = process.env.CLIENT_ID || "69";
  }

  public async login(token = process.env.DISCORD_TOKEN): Promise<string> {
    await this.db.$connect();

    const cleanCache = () => {
      this.logger.info(
        `[INFO] Clearing requestCache (${this.requestCache.size()} values cleared).`
      );
      this.requestCache.clear();
      setTimeout(cleanCache, 900000);
    };
    cleanCache();

    return super.login(token);
  }
}
