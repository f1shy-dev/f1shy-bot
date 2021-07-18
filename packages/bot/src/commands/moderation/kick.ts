import type { Message } from "discord.js";
import { Args } from "@sapphire/framework";

import { ErrorEmbed, SuccessEmbed } from "../../lib/EmbedBuilders";
import {
  CustomCommand,
  CustomCommandOptions,
} from "../../structures/CustomCommand";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<CustomCommandOptions>({
  name: "kick",
  description: "Remove a member from your guild.",
  category: "Moderation",
  argString: "(member)",
  examples: ["@Steve"],
  preconditions: ["GuildOnly"],
})
export default class BanCommand extends CustomCommand {
  async run(message: Message, args: Args): Promise<Message> {
    const member = await args.pickResult("member");
    if (!member.success)
      return await message.channel.send({
        embeds: [ErrorEmbed("You must provide a valid member to kick!")],
      });

    if (!message?.member?.permissions.has("KICK_MEMBERS"))
      return message.channel.send({
        embeds: [
          ErrorEmbed("You don't have the required permissions to do that."),
        ],
      });

    try {
      await member.value.kick();
    } catch {
      return message.channel.send({
        embeds: [
          ErrorEmbed(
            "I can't kick that user, they are on a higher/the same permission level to this bot."
          ),
        ],
      });
    }

    return await message.channel.send({
      embeds: [SuccessEmbed(`<@${member.value.id}> was kicked successfully!`)],
    });
  }
}
