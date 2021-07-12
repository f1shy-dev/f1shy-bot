import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { CustomApplyOptions } from "../../lib/CustomApplyOptions";
import { ImageEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

@CustomApplyOptions({
  name: "waifu",
  description: "Find your anime wife here!",
  category: "Anime",
})
export default class CatCommand extends Command {
  async run(message: Message): Promise<Message> {
    const data: any = await fetch(
      "https://api.waifu.pics/sfw/waifu",
      FetchResultTypes.JSON
    );

    var embed = ImageEmbed(data.url)
      .setColor("#0099ff")
      .setDescription(":heart_eyes_cat: **Random Waifu**");

    return message.channel.send(embed);
  }
}
