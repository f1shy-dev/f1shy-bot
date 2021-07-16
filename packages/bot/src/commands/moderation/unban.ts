import type { Message } from "discord.js";
import { Args, Command } from "@sapphire/framework";

import { ApplyCustomOptions } from "../../lib/ApplyCustomOptions";
import { ErrorEmbed, SuccessEmbed } from "../../lib/EmbedBuilders";

@ApplyCustomOptions({
  name: "unban",
  description: "Unban a member from your guild.",
  category: "Moderation",
  usage: "(User ID)",
  examples: ["928355509870000567"],
  preconditions: ["GuildOnly"],
})
export default class UnBanCommand extends Command {
  async run(message: Message, args: Args): Promise<Message> {
    const member = args.next();
    if (!message?.member?.permissions.has("BAN_MEMBERS"))
      return message.channel.send({
        embeds: [
          ErrorEmbed("You don't have the required permissions to do that."),
        ],
      });

    const banList = await message?.guild?.bans.fetch();

    const bannedUser = banList?.find((user) => user.user.id === member)?.user;
    if (!bannedUser)
      return message.channel.send({
        embeds: [
          ErrorEmbed(
            "That isn't the ID of a valid banned member in this guild!"
          ),
        ],
      });

    message?.guild?.members.unban(bannedUser);

    return await message.channel.send({
      embeds: [SuccessEmbed(`<@${member}> was unbanned successfully!`)],
    });
  }
}
