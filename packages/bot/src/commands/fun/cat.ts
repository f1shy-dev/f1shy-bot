import { PieceContext } from "@sapphire/framework";
import { FetchCommand } from "../../structures/FetchCommand";

export default class CatCommand extends FetchCommand {
  constructor(context: PieceContext) {
    super(context, {
      name: "cat",
      apiURL: "https://some-random-api.ml/img/cat",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
      dataParser: (data): string => data.link,
      label: ":cat: **Random Cat**",
      description: "Looking for some fresh pussy? Look no further!",
      category: "Fun",
      aliases: ["pussy"],
    });
  }
}
