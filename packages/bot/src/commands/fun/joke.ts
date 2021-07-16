import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { ApplyCustomOptions } from "../../lib/ApplyCustomOptions";
import { BasicEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

@ApplyCustomOptions({
  name: "joke",
  description: "Perfect place for a bit of humour.",
  aliases: ["funnyjoke", "randomjoke"],
  category: "Fun",
})
export default class FactCommand extends Command {
  async run(message: Message): Promise<Message> {
    const data: string = await fetch(
      "https://v2.jokeapi.dev/joke/Any?safe-mode&lang=en&format=txt",
      FetchResultTypes.Text
    );
    const embed = BasicEmbed().setColor("#").setDescription(data);

    return message.channel.send({ embeds: [embed] });
  }
}
