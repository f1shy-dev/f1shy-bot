import {
  Message,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  SelectMenuInteraction,
  TextChannel,
} from "discord.js";
import { ApplyCustomOptions } from "../../lib/ApplyCustomOptions";
import { AliasStore, Args, Command } from "@sapphire/framework";
import { CustomCommand } from "../../structures/CustomCommand";
import { BasicEmbed, ErrorEmbed, InfoEmbed } from "../../lib/EmbedBuilders";
import { getGuildSettings } from "../../lib/GetSettings";
import { CustomClient } from "../../structures/CustomClient";
import { categoryEmojis } from "../../lib/CategoryEmojis";
import { nanoid } from "nanoid";

@ApplyCustomOptions({
  name: "help",
  description: "Get help on a individual command, or get info on all commands!",
  category: "General",
  usage: "[command/alias name]",
  examples: ["ping", ""],
})
export default class HelpCommand extends Command {
  async run(message: Message, args: Args): Promise<any> {
    const commands = this.context.stores.get(
      "commands"
    ) as AliasStore<CustomCommand>;

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
        return message.channel.send({
          embeds: [
            ErrorEmbed(`The command \`${singleCmd.value}\` doesn't exist!`),
          ],
        });

      let fields = [
        {
          name: "Description",
          value: parsed.description,
        },
        {
          name: "Usage",
          value: `\`${guildPrefix}${parsed.name}${
            parsed.usage ? ` ${parsed.usage}` : ""
          }\``,
        },
      ];

      parsed.aliases.length > 0 &&
        fields.push({
          name: "Aliases",
          value: parsed.aliases.map((e: string) => `\`${e}\``).join(" "),
        });

      parsed.examples &&
        fields.push({
          name: "Examples",
          value: parsed.examples
            .map(
              (e: string) =>
                `\`${guildPrefix}${parsed.name}${e ? " " + e : ""}\``
            )
            .join(" "),
        });

      return message.channel.send({
        embeds: [
          BasicEmbed(
            "",
            `${categoryEmojis[parsed.category]} Command Help: \`${
              parsed.name
            }\``
          )
            .addFields(fields)
            .setFooter(
              "Arguments in () are required, ones in [] are optional."
            ),
        ],
      });
    }

    const categoryData: Record<string, string[]> = {};

    for (const [, cmd] of commands) {
      (categoryData[cmd.category] || (categoryData[cmd.category] = [])).push(
        cmd.name
      );
    }

    const id = nanoid();
    const select = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId(id)
        .setPlaceholder("Categories")
        .addOptions(
          Object.keys(categoryData).map((k) => ({
            value: k,
            label: k,
            emoji: categoryEmojis[k],
          }))
        )
    );

    const msg = await message.channel.send({
      content: "Pick one of the categories below to get a list of commands!",
      components: [select],
    });
    const filter = (i: SelectMenuInteraction) =>
      i.customId === id && i.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({
      filter,
      idle: 30000,
    });

    collector.on("collect", (i) => {
      if (!i.isSelectMenu()) return;
      const selected = i.values[0];
      const embed = BasicEmbed(
        "",
        `${categoryEmojis[selected]} ${selected} commands.`
      ).addFields(
        Object.keys(categoryData[selected]).map((c) => {
          const cmd = categoryData[selected][Number(c)];
          const fullCmd = this.context.client.stores
            .get("commands")
            .get(cmd) as CustomCommand;
          return {
            name: `\`${guildPrefix}${cmd}${
              fullCmd.usage ? " " + fullCmd.usage : ""
            }\``,
            value: fullCmd?.description || "N/A",
          };
        })
      );

      i.deferUpdate();

      msg.edit({
        embeds: [embed],
        components: [select],
      });
    });
    collector.on("end", () => {
      msg.edit({
        embeds: [InfoEmbed("This interaction has ended.")],
        components: [],
        content: "\u200b",
      });
    });

    return;
  }
}
