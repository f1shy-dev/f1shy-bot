import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";

import { BasicEmbed } from "../../lib/EmbedBuilders";
import {
  CustomCommand,
  CustomCommandOptions,
} from "../../structures/CustomCommand";

@ApplyOptions<CustomCommandOptions>({
  name: "invite",
  description: "Get a link to invite F1shyBot's to your own servers!",
  category: "General",
})
export default class PingCommand extends CustomCommand {
  async run(message: Message): Promise<Message> {
    return await message.channel.send({
      embeds: [
        BasicEmbed(
          `[Click here to go to invite **${this.context.client.user?.username}** to your own server!](https://discord.com/api/oauth2/authorize?client_id=${this.context.client.options.api?.auth?.id}&permissions=268520566&scope=bot)`
        ),
      ],
    });
  }
}
