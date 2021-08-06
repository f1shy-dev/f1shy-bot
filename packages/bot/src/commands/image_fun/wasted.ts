import { PieceContext } from "@sapphire/framework";
import { ImageFunCommand } from "../../structures/ImageFunCommand";

export default class WastedCommand extends ImageFunCommand {
  constructor(context: PieceContext) {
    super(context, {
      name: "wasted",
      filter: "wasted",
      description: "Adds a wasted overlay to your avatar.",
      category: "Image Fun",
    });
  }
}
