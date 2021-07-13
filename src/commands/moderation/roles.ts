import { Message, Role } from "discord.js";
import { Command } from "@sapphire/framework";
import { CustomApplyOptions } from "../../lib/CustomApplyOptions";
import { BasicEmbed } from "../../lib/EmbedBuilders";
import { join } from "@prisma/client/runtime";

@CustomApplyOptions({
  name: "roles",
  description: "Shows a list of guild roles!",
  category: "Moderation",
  aliases: ["allroles", "listroles"],
})
export default class RolesCommand extends Command {
  async run(message: Message): Promise<Message> {
    const roles = message?.guild?.roles.cache
      .sort((a, b) => b.position - a.position)
      .filter((r) => r.name !== "@everyone")
      .map((r) => `<@&${r.id}>`);

    let joint = roles?.join("\n") || "Seems like you have no roles!";
    let extra = 0;

    while (joint?.length > 4000) {
      roles?.pop();
      joint = roles?.join("\n") || "Seems like you have no roles!";
      extra++;
    }

    return await message.channel.send(
      BasicEmbed(`All Roles (${roles?.length})`).setDescription(
        `${joint}${extra > 0 ? `\n...and ${extra} more.` : ""}`
      )
    );
  }
}
