import type { Message } from "discord.js";
import { Args, Command } from "@sapphire/framework";

import { CustomApplyOptions } from "../../lib/CustomApplyOptions";
import { ErrorEmbed, SuccessEmbed } from "../../lib/EmbedBuilders";

@CustomApplyOptions({
  name: "kick",
  description: "Remove a member from your guild.",
  category: "Moderation",
  usage: "(User to kick)",
  examples: ["@Steve"],
  preconditions: ["GuildOnly"],
})
export default class BanCommand extends Command {
  async run(message: Message, args: Args): Promise<Message> {
    const member = await args.pickResult("member");
    if (!member.success)
      return await message.channel.send(
        ErrorEmbed("You must provide a valid member to kick!")
      );

    if (!message?.member?.hasPermission("KICK_MEMBERS"))
      return message.channel.send(
        ErrorEmbed("You don't have the required permissions to do that.")
      );

    try {
      await member.value.kick();
    } catch {
      return message.channel.send(
        ErrorEmbed(
          "I can't kick that user, they are on a higher/the same permission level to this bot."
        )
      );
    }

    return await message.channel.send(
      SuccessEmbed(`<@${member.value.id}> was kicked successfully!`)
    );
  }
}
