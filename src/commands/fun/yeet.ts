import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { CustomApplyOptions } from "../../lib/CustomApplyOptions";
import { ImageEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

@CustomApplyOptions({
  name: "yeet",
  description: "The only way to get rid of it, YEET IT!",
  aliases: ["begone"],
  category: "Fun",
})
export default class CatCommand extends Command {
  async run(message: Message): Promise<Message> {
    const data: any = await fetch(
      "https://api.waifu.pics/sfw/yeet",
      FetchResultTypes.JSON
    );

    const embed = ImageEmbed(data.url).setDescription(
      "<:yeet:864266431868698625> **YEET!**"
    );

    return message.channel.send(embed);
  }
}
