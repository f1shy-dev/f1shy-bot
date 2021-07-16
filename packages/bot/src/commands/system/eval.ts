import type { Message } from "discord.js";
import { Args, Command } from "@sapphire/framework";
import { isThenable } from "@sapphire/utilities";
import { ApplyCustomOptions } from "../../lib/ApplyCustomOptions";
import { CustomClient } from "../../structures/CustomClient";
import { getDefaultBotSettings } from "../../lib/GetSettings";
import { BasicEmbed, ErrorEmbed } from "../../lib/EmbedBuilders";
import { inspect } from "util";
import { join } from "path";
@ApplyCustomOptions({
  name: "eval",
  description: "Executes arbitrary JavaScript code.",
  category: "System",
  aliases: ["runjavascript", "runjs", "raweval"],
  quotes: [],
  usage: "(js code)",
})
export default class EvalCommand extends Command {
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

      evaled.replaceAll(process.env.DISCORD_TOKEN || "", "__REDACTED__");
      evaled.replaceAll(process.env.DATABASE_URL || "", "__REDACTED__");
      evaled.replaceAll(process.env.PM2_PUBLIC_KEY || "", "__REDACTED__");
      evaled.replaceAll(process.env.PM2_SECRET_KEY || "", "__REDACTED__");
      evaled.replaceAll(process.env.PGPASSWORD || "", "__REDACTED__");

      const resultEmbed = BasicEmbed()
        .setDescription(
          `**Executed Code**
          \`${code.value}\`

          **Result**
          \`\`\`js\n${clean(evaled).substring(0, 3950)}${
            clean(evaled).length > 3950 ? "..." : ""
          }\n\`\`\``
        )
        .setFooter(
          "This code is ran locally (on the current shard), NOT IN A SANDBOX."
        );

      // return message.channel.send(clean(evaled), { code: "js" });
      return message.channel.send({ embeds: [resultEmbed] });
    } catch (err) {
      const errEmbed = BasicEmbed().setDescription(
        `**Executed Code**
          \`${code.value}\`

          **Result (Error)**
          \`\`\`js\n${clean(`${err}`).substring(0, 3950)}${
          clean(`${err}`).length > 3950 ? "..." : ""
        }\n\`\`\``
      );
      return message.channel.send({ embeds: [errEmbed] });
    }
  }
}

const clean = (text: string) => {
  return text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
    .replaceAll(join(__dirname, "../"), "./");
};
