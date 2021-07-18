import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";

import { BasicEmbed } from "../../lib/EmbedBuilders";
import {
  CustomCommand,
  CustomCommandOptions,
} from "../../structures/CustomCommand";

@ApplyOptions<CustomCommandOptions>({
  name: "ping",
  description: "Sends back the ping of the bot!",
  category: "General",
})
export default class PingCommand extends CustomCommand {
  async run(message: Message): Promise<Message> {
    return await message.channel.send({
      embeds: [
        BasicEmbed(":ping_pong: Pong!").setDescription(
          `Bot Latency: \`${this.context.client.ws.ping}ms\`
          API Latency: \`${Date.now() - message.createdTimestamp}ms\``
        ),
      ],
    });
  }
}
