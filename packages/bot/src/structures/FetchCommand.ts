import fetch from "@sapphire/fetch";
import { PieceContext } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";
import { ErrorEmbed, ImageEmbed } from "../lib/EmbedBuilders";
import { CustomClient } from "./CustomClient";
import { CustomCommand } from "./CustomCommand";

export interface FetchCommandOptions {
  name: string;
  apiURL: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataParser: (data: any) => string;
  label?: string;
  description: string;
  category: string;
  aliases?: string[];
  embedParser?: (data: string) => MessageEmbed;
}

export class FetchCommand extends CustomCommand {
  public apiURL: string;
  public dataParser: (data: unknown) => string;
  public label?: string;
  public embedParser?: (data: string) => MessageEmbed;

  constructor(context: PieceContext, options: FetchCommandOptions) {
    super(context, options);

    this.apiURL = options.apiURL;
    this.label = options.label;
    this.dataParser = options.dataParser;
    this.embedParser = options.embedParser;
  }

  async run(message: Message): Promise<unknown> {
    message.channel.sendTyping();
    const cache = (this.context.client as CustomClient).requestCache;
    let parsed: string;
    let fromCache = false;

    try {
      parsed = this.dataParser(await fetch(this.apiURL));
      if (!parsed) throw "no data";
    } catch (err) {
      console.log(err);
      parsed = cache.getRandom(this.name);
      fromCache = true;
      if (!parsed)
        return message.channel.send({
          embeds: [
            ErrorEmbed(
              "An internal error occured while trying to execute that command."
            ),
          ],
        });
    }
    let embed: MessageEmbed;

    if (this.embedParser) embed = this.embedParser(parsed);
    else {
      embed = ImageEmbed(parsed);
      this.label && embed.setDescription(this.label);
    }

    message.channel.send({ embeds: [embed] });
    if (!fromCache) cache.add(this.name, parsed);
  }
}
