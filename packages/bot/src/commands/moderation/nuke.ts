import type { Message, TextChannel } from "discord.js";
import { Args, Command } from "@sapphire/framework";

import { ApplyCustomOptions } from "../../lib/ApplyCustomOptions";
import { BasicEmbed, ErrorEmbed } from "../../lib/EmbedBuilders";
import { Channel } from "discord.js";

@ApplyCustomOptions({
  name: "nuke",
  description:
    "Delete all messages from the channel it is executed in (revokes ID and webhooks too).",
  category: "Moderation",
  preconditions: ["GuildOnly"],
})
export default class BanCommand extends Command {
  async run(message: Message, args: Args): Promise<Channel | Message> {
    if (!message?.member?.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        ErrorEmbed("You don't have the required permissions to do that.")
      );

    try {
      (message.channel as TextChannel)
        .clone({ position: (message.channel as TextChannel).rawPosition })
        .then((ch) => {
          ch.send(
            BasicEmbed()
              .setAuthor(
                "This channel was nuked.",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Nuclear_symbol.svg/1200px-Nuclear_symbol.svg.png"
              )
              .setFooter(
                "Note: Nuking a channel changes it's ID and revokes webhooks."
              )
          ).then((msg) => setTimeout(() => msg.delete(), 5000));
        });

      return message.channel.delete();
    } catch {
      return message.channel.send(
        ErrorEmbed("I don't have the permission to nuke this channel.")
      );
    }
  }
}
