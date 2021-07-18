import { PieceContext } from "@sapphire/framework";
import { FetchCommand } from "../../structures/FetchCommand";

export default class YeetCommand extends FetchCommand {
  constructor(context: PieceContext) {
    super(context, {
      name: "yeet",
      aliases: ["begone"],
      apiURL: "https://api.waifu.pics/sfw/yeet",
      dataParser: (data): string => data.url,
      label: "<:yeet:864266431868698625> **YEET!**",
      description: "The best way to get rid of it, YEET it!.",
      category: "Anime",
    });
  }
}
