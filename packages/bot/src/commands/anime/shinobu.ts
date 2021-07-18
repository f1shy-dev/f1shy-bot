import { PieceContext } from "@sapphire/framework";
import { FetchCommand } from "../../structures/FetchCommand";

export default class AnimeCommand extends FetchCommand {
  constructor(context: PieceContext) {
    super(context, {
      name: "shinobu",
      apiURL: "https://api.waifu.pics/sfw/shinobu",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
      dataParser: (data): string => data.url,
      label: ":purple_heart: **Random Shinobu**",
      description: "Get a random picture of a shinobu.",
      category: "Anime",
    });
  }
}
