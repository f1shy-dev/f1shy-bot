import type { Message } from "discord.js";

import { BasicEmbed } from "../../lib/EmbedBuilders";
import { ApplyOptions } from "@sapphire/decorators";
import {
  CustomCommand,
  CustomCommandOptions,
} from "../../structures/CustomCommand";

@ApplyOptions<CustomCommandOptions>({
  name: "dashboard",
  description: "Get a link to F1shyBot's dashboard!",
  category: "General",
})
export default class PingCommand extends CustomCommand {
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
