import { PieceContext } from "@sapphire/framework";
import { FetchCommand } from "../../structures/FetchCommand";

export default class AnimeCommand extends FetchCommand {
  constructor(context: PieceContext) {
    super(context, {
      name: "handhold",
      apiURL: "https://api.waifu.pics/sfw/handhold",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
      dataParser: (data): string => data.url,
      label: ":handshake: **Random Handhold**",
      description: "Get a random picture of a handhold.",
      category: "Anime",
    });
  }
}
