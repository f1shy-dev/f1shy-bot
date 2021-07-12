import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { CustomApplyOptions } from "../../lib/CustomApplyOptions";
import { ImageEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

@CustomApplyOptions({
  name: "neko",
  description: "Cat-like goodness, available here!",
  aliases: ["nekocat"],
  category: "Anime",
})
export default class CatCommand extends Command {
  async run(message: Message): Promise<Message> {
    const data: any = await fetch(
      "https://api.waifu.pics/sfw/neko",
      FetchResultTypes.JSON
    );

    const embed = ImageEmbed(data.url).setDescription(
      ":heart_eyes_cat: **Random Neko**"
    );

    return message.channel.send(embed);
  }
}
