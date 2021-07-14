import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { ApplyCommandOptions } from "../../lib/ApplyCommandOptions";
import { ImageEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

@ApplyCommandOptions({
  name: "highfive",
  description: "Couldn't be more in agreement.",
  category: "Anime",
})
export default class AnimeCommand extends Command {
  async run(message: Message): Promise<Message> {
    const data: any = await fetch(
      "https://api.waifu.pics/sfw/highfive",
      FetchResultTypes.JSON
    );

    const embed = ImageEmbed(data.url).setDescription(":clap: **High-five!**");

    return message.channel.send(embed);
  }
}
