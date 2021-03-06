import type { Message, TextChannel } from "discord.js";

import { BasicEmbed, ErrorEmbed } from "../../lib/EmbedBuilders";
import { Channel } from "discord.js";
import {
  CustomCommand,
  CustomCommandOptions,
} from "../../structures/CustomCommand";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<CustomCommandOptions>({
  name: "nuke",
  description:
    "Delete all messages from the channel it is executed in (revokes ID and webhooks too).",
  category: "Moderation",
  preconditions: ["GuildOnly"],
})
export default class BanCommand extends CustomCommand {
  async run(message: Message): Promise<Channel | Message> {
    if (!message?.member?.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send({
        embeds: [
          ErrorEmbed("You don't have the required permissions to do that."),
        ],
      });

    try {
      (message.channel as TextChannel)
        .clone({ position: (message.channel as TextChannel).rawPosition })
        .then((ch) => {
          ch.send({
            embeds: [
              BasicEmbed()
                .setAuthor(
                  "This channel was nuked.",
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Nuclear_symbol.svg/1200px-Nuclear_symbol.svg.png"
                )
                .setFooter(
                  "Note: Nuking a channel changes it's ID and revokes webhooks."
                ),
            ],
          }).then((msg) => setTimeout(() => msg.delete(), 5000));
        });

      return message.channel.delete();
    } catch {
      return message.channel.send({
        embeds: [
          ErrorEmbed("I don't have the permission to nuke this channel."),
        ],
      });
    }
  }
}
