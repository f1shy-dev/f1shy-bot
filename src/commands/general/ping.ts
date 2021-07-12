import type { CommandOptions } from "@sapphire/framework";
import type { Message } from "discord.js";

import { Command } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
  name: "ping",
  description: "Sends back the ping of the bot!",
})
export default class PingCommand extends Command {
  async run(message: Message): Promise<Message> {
    const PingEmbed = new MessageEmbed()
      .setTitle("Measureing Ping!")
      .setDescription("Ping!")
      .setColor("GREEN");
    const msg = await message.channel.send(PingEmbed);
    return msg.edit(
      PingEmbed.setTitle("Ping Fetched").setDescription(
        [
          "Pong!",
          `Bot Latency: ${this.context.client.ws.ping}ms.`,
          `API Latency: ${msg.createdTimestamp - message.createdTimestamp}ms.`,
        ].join("\n")
      )
    );
  }
}
