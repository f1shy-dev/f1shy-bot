import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { CustomApplyOptions } from "../../lib/CustomApplyOptions";
import { ImageEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

@CustomApplyOptions({
  name: "dog",
  description: "Looking for man's best friend? Look no further!",
  category: "Fun",
})
export default class CatCommand extends Command {
  async run(message: Message): Promise<Message> {
    const data: any = await fetch(
      "https://api.thedogapi.com/v1/images/search",
      FetchResultTypes.JSON
    );

    var embed = ImageEmbed(data[0].url)
      .setColor("#0099ff")
      .setDescription(":dog: **Random Dog**");

    return message.channel.send(embed);
  }
}
