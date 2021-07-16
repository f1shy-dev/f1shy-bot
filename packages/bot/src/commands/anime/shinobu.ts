import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { ApplyCustomOptions } from "../../lib/ApplyCustomOptions";
import { ImageEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

@ApplyCustomOptions({
  name: "shinobu",
  description: "You have found the place of everything shinobu!",
  category: "Anime",
})
export default class AnimeCommand extends Command {
  async run(message: Message): Promise<Message> {
    const data: any = await fetch(
      "https://api.waifu.pics/sfw/shinobu",
      FetchResultTypes.JSON
    );

    const embed = ImageEmbed(data.url).setDescription(
      ":purple_heart: **Random Shinobu**"
    );

    return message.channel.send({ embeds: [embed] });
  }
}
