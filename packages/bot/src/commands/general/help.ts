import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { ApplyCustomOptions } from "../../lib/ApplyCustomOptions";
import { Args, Command } from "@sapphire/framework";
import { CustomCommand } from "../../structures/CustomCommand";
import { BasicEmbed, ErrorEmbed } from "../../lib/EmbedBuilders";
import { getGuildSettings } from "../../lib/GetSettings";
import { CustomClient } from "../../structures/CustomClient";

@ApplyCustomOptions({
  name: "help",
  description: "Get help on a command or show all commands!",
  aliases: ["cmdhelp", "commandhelp", "gethelp"],
  category: "General",
  usage: "[command/alias name]",
  examples: ["ping", ""],
})
export default class HelpCommand extends Command {
  async run(message: Message, args: Args): Promise<Message> {
    const commands = this.context.stores.get("commands") as any as [
      any,
      CustomCommand
    ][];

    const guildPrefix = (
      await getGuildSettings(
        (this.context.client as CustomClient).db,
        message?.guild?.id || "69"
      )
    )?.prefix;

    const singleCmd = await args.pickResult("string");
    if (singleCmd.success) {
      console.log();
      const allCmds = new Map([
        ...this.context.stores.get("commands").aliases,
        ...commands,
      ]);

      const parsed = allCmds.get(singleCmd.value) as CustomCommand;
      if (!parsed)
        return message.channel.send(
          ErrorEmbed(`The command \`${singleCmd.value}\` doesn't exist!`)
        );

      let fields = [
        {
          name: "Description",
          value: parsed.description,
        },
      ];

      fields.push({
        name: "Usage",
        value: `\`${guildPrefix}${parsed.name}${
          parsed.usage ? ` ${parsed.usage}` : ""
        }\``,
      });

      if (parsed.aliases.length > 0)
        fields.push({
          name: "Aliases",
          value: parsed.aliases.map((e: string) => `\`${e}\``).join(" "),
        });

      if (parsed.examples)
        fields.push({
          name: "Examples",
          value: parsed.examples
            .map(
              (e: string) =>
                `\`${guildPrefix}${parsed.name}${e ? " " + e : ""}\``
            )
            .join(" "),
        });

      return message.channel.send(
        BasicEmbed(`Command Help: \`${parsed.name}\``)
          .addFields(fields)
          .setFooter("Arguments in () are required, ones in [] are optional.")
      );
    }
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
