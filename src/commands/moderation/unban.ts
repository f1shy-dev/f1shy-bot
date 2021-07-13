import type { Guild, GuildManager, GuildMember, Message } from "discord.js";
import { Args, Command, Result, UserError } from "@sapphire/framework";

import { CustomApplyOptions } from "../../lib/CustomApplyOptions";
import { ErrorEmbed, SuccessEmbed } from "../../lib/EmbedBuilders";

@CustomApplyOptions({
  name: "unban",
  description: "Unban a member from your guild.",
  category: "Moderation",
  usage: "(User ID)",
  examples: ["928355509870000567"],
})
export default class UnBanCommand extends Command {
  async run(message: Message, args: Args): Promise<Message> {
    const member = args.next();
    if (!message?.member?.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        ErrorEmbed("You don't have the required permissions to do that.")
      );

    const banList = await message?.guild?.fetchBans();

    const bannedUser = banList?.find((user) => user.user.id === member);
    if (!bannedUser)
      return message.channel.send(
        ErrorEmbed("That isn't the ID of a valid banned member in this guild!")
      );

    message?.guild?.members.unban(member);

    return await message.channel.send(
      SuccessEmbed(`<@${member}> was unbanned successfully!`)
    );
  }
}
