import { PieceContext } from "@sapphire/framework";
import { FetchCommand } from "../../structures/FetchCommand";

export default class DogCommand extends FetchCommand {
  constructor(context: PieceContext) {
    super(context, {
      name: "dog",
      apiURL: "https://some-random-api.ml/img/dog",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
      dataParser: (data): string => data.link,
      label: ":dog: **Random Dog**",
      description: "Looking for a man's best friend? Look no further!",
      category: "Fun",
    });
  }
}
