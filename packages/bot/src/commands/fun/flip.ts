import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";

import { BasicEmbed } from "../../lib/EmbedBuilders";
import {
  CustomCommand,
  CustomCommandOptions,
} from "../../structures/CustomCommand";

@ApplyOptions<CustomCommandOptions>({
  name: "flip",
  description: "Flip a coin, nothing else.",
  aliases: ["flipacoin", "flipcoin"],
  category: "Fun",
})
export default class FlipCommand extends CustomCommand {
  async run(message: Message): Promise<Message> {
    const chance = Math.floor(Math.random() * 2) == 0;
    const embed = BasicEmbed().setDescription(
      `The :coin: reads **${chance ? "heads!" : "tails!"}**`
    );

    return message.channel.send({ embeds: [embed] });
  }
}
