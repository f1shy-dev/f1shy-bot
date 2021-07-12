import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { CustomApplyOptions } from "../../lib/CustomApplyOptions";
import { BasicEmbed } from "../../lib/EmbedBuilders";

@CustomApplyOptions({
  name: "ping",
  description: "Sends back the ping of the bot!",
  category: "General",
})
export default class PingCommand extends Command {
  async run(message: Message): Promise<Message> {
    return await message.channel.send(
      BasicEmbed(":ping_pong: Pong!").setDescription(
        `Bot Latency: \`${this.context.client.ws.ping}ms\`
          API Latency: \`${Date.now() - message.createdTimestamp}ms\``
      )
    );
  }
}
