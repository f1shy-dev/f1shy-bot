import { PieceContext } from "@sapphire/framework";
import { FetchCommand } from "../../structures/FetchCommand";

export default class PandaCommand extends FetchCommand {
  constructor(context: PieceContext) {
    super(context, {
      name: "panda",
      apiURL: "https://some-random-api.ml/img/panda",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
      dataParser: (data): string => data.link,
      label: ":panda_face: **Random Panda**",
      description: "Get an image of your next bamboo-eating friend.",
      category: "Fun",
    });
  }
}
