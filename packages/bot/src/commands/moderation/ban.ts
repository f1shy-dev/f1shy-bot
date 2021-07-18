import type { Message } from "discord.js";
import { Args } from "@sapphire/framework";

import { ErrorEmbed, SuccessEmbed } from "../../lib/EmbedBuilders";
import { ApplyOptions } from "@sapphire/decorators";
import {
  CustomCommandOptions,
  CustomCommand,
} from "../../structures/CustomCommand";

@ApplyOptions<CustomCommandOptions>({
  name: "ban",
  description: "Permamently ban a member from your guild.",
  category: "Moderation",
  argString: "(member) [reason]",
  examples: ["@Steve Absuing rules.", "@Bob"],
  preconditions: ["GuildOnly"],
})
export default class BanCommand extends CustomCommand {
  async run(message: Message, args: Args): Promise<Message> {
    const member = await args.pickResult("member");
    const reason = await args
      .pickResult("string")
      .then((e) => e.value || "N/A");
    if (!member.success)
      return await message.channel.send({
        embeds: [ErrorEmbed("You must provide a valid member to ban!")],
      });

    if (!message?.member?.permissions.has("BAN_MEMBERS"))
      return message.channel.send({
        embeds: [
          ErrorEmbed("You don't have the required permissions to do that."),
        ],
      });

    try {
      await member.value.ban({ reason });
    } catch {
      return message.channel.send({
        embeds: [
          ErrorEmbed(
            "I can't ban that user, they are on a higher/the same permission level to this bot."
          ),
        ],
      });
    }

    return await message.channel.send({
      embeds: [SuccessEmbed(`<@${member.value.id}> was banned successfully!`)],
    });
  }
}
