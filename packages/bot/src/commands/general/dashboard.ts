import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { ApplyCustomOptions } from "../../lib/ApplyCustomOptions";
import { BasicEmbed } from "../../lib/EmbedBuilders";
import { CustomClient } from "../../structures/CustomClient";

@ApplyCustomOptions({
  name: "dashboard",
  description: "Get a link to F1shyBot's dashboard!",
  category: "General",
})
export default class PingCommand extends Command {
  async run(message: Message): Promise<Message> {
    return await message.channel.send({
      embeds: [
        BasicEmbed(
          "[Click here to go to F1shyBot's web dashboard!](https://bot.f1sh.me)"
        ),
      ],
    });
  }
}
