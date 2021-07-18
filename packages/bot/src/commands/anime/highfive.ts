import { PieceContext } from "@sapphire/framework";
import { FetchCommand } from "../../structures/FetchCommand";

export default class AnimeCommand extends FetchCommand {
  constructor(context: PieceContext) {
    super(context, {
      name: "highfive",
      apiURL: "https://api.waifu.pics/sfw/highfive",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
      dataParser: (data): string => data.url,
      label: ":clap: **High-five!**",
      description: "High-five!",
      category: "Anime",
    });
  }
}
