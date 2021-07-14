import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

import { ApplyCommandOptions } from "../../lib/ApplyCommandOptions";
import { ImageEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

@ApplyCommandOptions({
  name: "dog",
  description: "Looking for man's best friend? Look no further!",
  category: "Fun",
})
export default class DogCommand extends Command {
  async run(message: Message): Promise<Message> {
    const data: any = await fetch(
      "https://api.thedogapi.com/v1/images/search",
      FetchResultTypes.JSON
    );

    const embed = ImageEmbed(data[0].url).setDescription(
      ":dog: **Random Dog**"
    );

    return message.channel.send(embed);
  }
}
