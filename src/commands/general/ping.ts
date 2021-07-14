import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { ApplyCommandOptions } from "../../lib/ApplyCommandOptions";
import { BasicEmbed } from "../../lib/EmbedBuilders";
import { CustomClient } from "../../lib/CustomClient";

@ApplyCommandOptions({
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
