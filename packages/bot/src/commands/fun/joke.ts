import { BasicEmbed } from "../../lib/EmbedBuilders";
import { PieceContext } from "@sapphire/framework";
import { FetchCommand } from "../../structures/FetchCommand";

export default class JokeCommand extends FetchCommand {
  constructor(context: PieceContext) {
    super(context, {
      name: "joke",
      description: "Perfect place for a bit of humour.",
      aliases: ["funnyjoke", "randomjoke"],
      category: "Fun",
      apiURL: "https://v2.jokeapi.dev/joke/Any?safe-mode&lang=en&format=json",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
      dataParser: (data) =>
        data.type === "single"
          ? data.joke
          : `${data.setup}\n\n${data.delivery}`,
      embedParser: (data) => BasicEmbed(data).setColor("RANDOM"),
    });
  }
}
