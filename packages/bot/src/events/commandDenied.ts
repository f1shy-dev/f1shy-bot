import {
  CommandDeniedPayload,
  Event,
  PieceContext,
  UserError,
} from "@sapphire/framework";
import { ErrorEmbed } from "../lib/EmbedBuilders";

export default class ReadyEvent extends Event {
  constructor(context: PieceContext) {
    super(context);
  }

  async run(error: UserError, payload: CommandDeniedPayload): Promise<void> {
    const errMsg: string = error.message;
    // if (error.identifier === "preconditionCooldown")
    payload.message.channel.send({ embeds: [ErrorEmbed(errMsg)] });
  }
}
