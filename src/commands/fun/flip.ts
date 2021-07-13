import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { CustomApplyOptions } from "../../lib/CustomApplyOptions";
import { BasicEmbed, ImageEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

@CustomApplyOptions({
  name: "flip",
  description: "Flip a coin, nothing else.",
  aliases: ["flipacoin", "flipcoin"],
  category: "Fun",
})
export default class FlipCommand extends Command {
  async run(message: Message): Promise<Message> {
    const chance = Math.floor(Math.random() * 2) == 0;
    const embed = BasicEmbed().setDescription(
      `The :coin: reads **${chance ? "heads!" : "tails!"}**`
    );

    return message.channel.send(embed);
  }
}
