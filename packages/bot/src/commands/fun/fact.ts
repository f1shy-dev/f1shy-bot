import { BasicEmbed } from "../../lib/EmbedBuilders";
import { PieceContext } from "@sapphire/framework";
import { FetchCommand } from "../../structures/FetchCommand";

export default class FactCommand extends FetchCommand {
  constructor(context: PieceContext) {
    super(context, {
      name: "fact",
      apiURL: "https://uselessfacts.jsph.pl/random.json?language=en",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
      dataParser: (data) => data.text.replaceAll("`", "'"),
      description: "Perfect for knowing useless stuff.",
      category: "Fun",
      embedParser: (data) => BasicEmbed(data).setColor("RANDOM"),
    });
  }
}
