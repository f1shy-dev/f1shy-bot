import type { Message } from "discord.js";
import { Args, Command } from "@sapphire/framework";
import { CustomApplyOptions } from "../../lib/CustomApplyOptions";
import { CustomClient } from "../../lib/CustomClient";
import { getDefaultBotSettings } from "../../lib/GetSettings";
import { BasicEmbed, ErrorEmbed } from "../../lib/EmbedBuilders";
import { inspect } from "util";
import { join } from "path";
@CustomApplyOptions({
  name: "eval",
  description: "Executes arbitrary JavaScript code.",
  category: "System",
  aliases: ["runjavascript", "runjs", "raweval"],
  quotes: [],
})
export default class EvalCommand extends Command {
  async run(message: Message, args: Args): Promise<Message> {
    const prisma = (this.context.client as CustomClient).prisma;

    if (
      (await getDefaultBotSettings(prisma))?.botOwnerID !== message.member?.id
    )
      return message.channel.send(
        ErrorEmbed("You don't have the permissions to do that!")
      );

    const code = await args.restResult("string");

    try {
      if (!code.success)
        return message.channel.send(
          ErrorEmbed("You must provide some code to run.")
        );

      let evaled = eval(code.value);
      if (typeof evaled !== "string") evaled = inspect(evaled);
      if (typeof evaled !== "string") throw "Error: Can't print that as text.";

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
      return message.channel.send(resultEmbed);
    } catch (err) {
      const errEmbed = BasicEmbed().setDescription(
        `**Executed Code**
          \`${code.value}\`

          **Result (Error)**
          \`\`\`js\n${clean(`${err}`).substring(0, 3950)}${
          clean(`${err}`).length > 3950 ? "..." : ""
        }\n\`\`\``
      );
      return message.channel.send(errEmbed);
    }
  }
}

const clean = (text: string) => {
  return text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
    .replaceAll(join(__dirname, "../"), "./");
};
