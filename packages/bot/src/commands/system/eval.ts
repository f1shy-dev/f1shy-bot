import type { Message } from "discord.js";
import { Args } from "@sapphire/framework";
import { isThenable } from "@sapphire/utilities";
import { CustomClient } from "../../structures/CustomClient";
import { getDefaultBotSettings } from "../../lib/GetSettings";
import { BasicEmbed, ErrorEmbed } from "../../lib/EmbedBuilders";
import { inspect } from "util";
import { join } from "path";
import {
  CustomCommand,
  CustomCommandOptions,
} from "../../structures/CustomCommand";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<CustomCommandOptions>({
  name: "eval",
  description: "Executes arbitrary JavaScript code.",
  category: "System",
  aliases: ["runjavascript", "runjs", "raweval"],
  quotes: [],
  argString: "(js code)",
})
export default class EvalCommand extends CustomCommand {
  async run(message: Message, args: Args): Promise<Message> {
    const prisma = (this.context.client as CustomClient).db;

    if (
      (await getDefaultBotSettings(prisma))?.botOwnerID !== message.member?.id
    )
      return message.channel.send({
        embeds: [ErrorEmbed("You don't have the permissions to do that!")],
      });

    const code = await args.restResult("string");

    try {
      if (!code.success)
        return message.channel.send({
          embeds: [ErrorEmbed("You must provide some code to run.")],
        });

      let evaled = eval(code.value);

      if (isThenable(evaled)) evaled = await evaled;

      if (typeof evaled !== "string")
        evaled = inspect(evaled, { depth: 1, showHidden: true });

      if (typeof evaled !== "string") throw "Error: Can't print that as text.";

      let strEvaled = evaled as string;

      ["DISCORD_TOKEN", "DATABASE_URL", "CLIENT_SECRET", "CLIENT_ID"].forEach(
        (v) =>
          (strEvaled = strEvaled.replaceAll(
            process.env[v] || "UNKNOWN_XX",
            "[REDACTED]"
          ))
      );
      const result =
        clean(strEvaled).substring(0, 3950) +
        (clean(strEvaled).length > 3950 ? "..." : "");

      const resultEmbed = BasicEmbed()
        .setDescription(
          `**Executed Code**
          \`${code.value}\`

          **Result**
          \`\`\`js\n${result}\n\`\`\``
        )
        .setFooter(
          "This code is ran locally (on the current shard), NOT IN A SANDBOX."
        );

      // return message.channel.send(clean(evaled), { code: "js" });
      return message.channel.send({ embeds: [resultEmbed] });
    } catch (err) {
      const result =
        clean(err).substring(0, 3950) + (clean(err).length > 3950 ? "..." : "");
      const errEmbed = BasicEmbed().setDescription(
        `**Executed Code**
          \`${code.value}\`

          **Result (Error)**
          \`\`\`js\n${result}\n\`\`\``
      );
      return message.channel.send({ embeds: [errEmbed] });
    }
  }
}

const clean = (text: string) =>
  text
    .toString()
    .replaceAll(/`/g, "`" + String.fromCharCode(8203))
    .replaceAll(/@/g, "@" + String.fromCharCode(8203))
    .replaceAll(join(__dirname, "../"), "./");
