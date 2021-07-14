import type { Message } from "discord.js";
import { Args, Command } from "@sapphire/framework";

import { ApplyCommandOptions } from "../../lib/ApplyCommandOptions";
import { ErrorEmbed, SuccessEmbed } from "../../lib/EmbedBuilders";

@ApplyCommandOptions({
  name: "ban",
  description: "Permamently ban a member from your guild.",
  category: "Moderation",
  usage: "(User to ban) [Reason]",
  examples: ["@Steve Absuing rules.", "@Bob"],
  preconditions: ["GuildOnly"],
})
export default class BanCommand extends Command {
  async run(message: Message, args: Args): Promise<Message> {
    const member = await args.pickResult("member");
    const reason = await args
      .pickResult("string")
      .then((e) => e.value || "N/A");
    if (!member.success)
      return await message.channel.send(
        ErrorEmbed("You must provide a valid member to ban!")
      );

    if (!message?.member?.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        ErrorEmbed("You don't have the required permissions to do that.")
      );

    try {
      await member.value.ban({ reason });
    } catch {
      return message.channel.send(
        ErrorEmbed(
          "I can't ban that user, they are on a higher/the same permission level to this bot."
        )
      );
    }

    return await message.channel.send(
      SuccessEmbed(`<@${member.value.id}> was banned successfully!`)
    );
  }
}
