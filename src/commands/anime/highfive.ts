import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { CustomApplyOptions } from "../../lib/CustomApplyOptions";
import { ImageEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

@CustomApplyOptions({
  name: "highfive",
  description: "Couldn't be more in agreement.",
  category: "Anime",
})
export default class CatCommand extends Command {
  async run(message: Message): Promise<Message> {
    const data: any = await fetch(
      "https://api.waifu.pics/sfw/highfive",
      FetchResultTypes.JSON
    );

    const embed = ImageEmbed(data.url).setDescription(":clap: **High-five!**");

    return message.channel.send(embed);
  }
}
