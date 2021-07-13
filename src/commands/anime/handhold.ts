import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { CustomApplyOptions } from "../../lib/CustomApplyOptions";
import { ImageEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

@CustomApplyOptions({
  name: "handhold",
  description: "Your favourite types of characters, holding hands!",
  category: "Anime",
})
export default class AnimeCommand extends Command {
  async run(message: Message): Promise<Message> {
    const data: any = await fetch(
      "https://api.waifu.pics/sfw/handhold",
      FetchResultTypes.JSON
    );

    const embed = ImageEmbed(data.url).setDescription(
      ":handshake:  **Random Handhold**"
    );

    return message.channel.send(embed);
  }
}
