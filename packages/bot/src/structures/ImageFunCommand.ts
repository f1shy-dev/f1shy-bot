import { Args, PieceContext } from "@sapphire/framework";
import { Message, MessageAttachment } from "discord.js";
import { ErrorEmbed } from "../lib/EmbedBuilders";
import { CustomCommand } from "./CustomCommand";

export interface ImageFunCommandOptions {
  name: string;
  filter: string;
  label?: string;
  description: string;
  category: string;
  aliases?: string[];
}

export class ImageFunCommand extends CustomCommand {
  public label?: string;

  constructor(context: PieceContext, options: ImageFunCommandOptions) {
    super(context, {
      ...options,
      cooldown: "1usages/10sec",
      argString: "[user]",
    });

    this.label = options.label;
  }

  async run(message: Message, args: Args): Promise<unknown> {
    message.channel.sendTyping();
    const user = await args.pickResult("member");

    const baseLink = "https://some-random-api.ml/canvas/wasted/?avatar=";
    const link = `${baseLink}${
      user.success
        ? user.value.user.avatarURL({ format: "png" })
        : message.author.avatarURL({ format: "png" })
    }`;

    try {
      const attachment = new MessageAttachment(link, "filter.png");
      message.channel.send({
        files: [attachment],
      });
    } catch (err) {
      this.client.logger.error(err);
      return message.channel.send({
        embeds: [
          ErrorEmbed(
            "An internal error occured while trying to execute that command."
          ),
        ],
      });
    }
  }
}
