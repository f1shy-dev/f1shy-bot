import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { CustomApplyOptions } from "../../lib/CustomApplyOptions";
import { ImageEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

@CustomApplyOptions({
  name: "shinobu",
  description: "You have found the place of everything shinobu!",
  category: "Anime",
})
export default class CatCommand extends Command {
  async run(message: Message): Promise<Message> {
    const data: any = await fetch(
      "https://api.waifu.pics/sfw/shinobu",
      FetchResultTypes.JSON
    );

    const embed = ImageEmbed(data.url).setDescription(
      ":purple_heart: **Random Shinobu**"
    );

    return message.channel.send(embed);
  }
}
