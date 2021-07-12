import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { CustomApplyOptions } from "../../lib/CustomApplyOptions";
import { Command } from "@sapphire/framework";
import { CustomCommand } from "../../lib/CustomCommand";

@CustomApplyOptions({
  name: "help",
  description: "Get help on a command or show all commands!",
  aliases: ["cmdhelp", "commandhelp", "gethelp"],
  category: "General",
})
export default class HelpCommand extends Command {
  async run(message: Message): Promise<Message> {
    const commands = this.context.stores.get("commands") as any as [
      any,
      CustomCommand
    ][];
    const categoryData: Record<any, string[]> = {};

    for (const [, cmd] of commands) {
      (categoryData[cmd.category] || (categoryData[cmd.category] = [])).push(
        cmd.name
      );
    }

    const fields = Object.keys(categoryData).map((catKey) => {
      const value = categoryData[catKey]
        .map((name: string) => `\`${name}\``)
        .join(" ");
      return { name: catKey, value: value };
    });

    const HelpEmbed = new MessageEmbed()
      .setAuthor(
        "All F1shyBot Commands",
        this.context.client.user?.avatarURL() || ""
      )
      .setColor("BLUE")
      .addFields(fields);

    return await message.channel.send(HelpEmbed);
  }
}
