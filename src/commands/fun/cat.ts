import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { ApplyCommandOptions } from "../../lib/ApplyCommandOptions";
import { ImageEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

@ApplyCommandOptions({
  name: "cat",
  description: "Looking for some fresh pussy? Look no further!",
  aliases: ["pussy"],
  category: "Fun",
})
export default class CatCommand extends Command {
  async run(message: Message): Promise<Message> {
    const data: any = await fetch(
      "https://api.thecatapi.com/v1/images/search",
      FetchResultTypes.JSON
    );

    const embed = ImageEmbed(data[0].url).setDescription(
      ":cat: **Random Cat**"
    );

    return message.channel.send(embed);
  }
}
