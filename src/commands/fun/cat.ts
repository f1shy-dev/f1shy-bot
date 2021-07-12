import type { CommandOptions } from "@sapphire/framework";
import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { CustomApplyOptions } from "../../lib/CustomApplyOptions";
import { BasicEmbed, ImageEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

@CustomApplyOptions({
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

    var embed = ImageEmbed(data[0].url)
      .setColor("#0099ff")
      .setDescription(":cat: **Random Cat**");

    return message.channel.send(embed);
  }
}
