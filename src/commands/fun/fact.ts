import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { ApplyCommandOptions } from "../../lib/ApplyCommandOptions";
import { BasicEmbed, ImageEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

@ApplyCommandOptions({
  name: "fact",
  description: "Perfect for knowing useless stuff.",
  aliases: ["uselessfact", "trashfact", "randomfact"],
  category: "Fun",
})
export default class FactCommand extends Command {
  async run(message: Message): Promise<Message> {
    const data: any = await fetch(
      "https://uselessfacts.jsph.pl/random.json?language=en",
      FetchResultTypes.JSON
    );
    const parsed = data.text.replaceAll("`", "'");
    const embed = BasicEmbed().setColor("#").setDescription(parsed);

    return message.channel.send(embed);
  }
}
