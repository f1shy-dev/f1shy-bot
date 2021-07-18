import type { Message } from "discord.js";
import { Args, CommandContext } from "@sapphire/framework";

import { BasicEmbed, ErrorEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";
import {
  CustomCommand,
  CustomCommandOptions,
} from "../../structures/CustomCommand";
import { ApplyOptions } from "@sapphire/decorators";
import { CustomClient } from "../../structures/CustomClient";

const animals = [
  "dog",
  "cat",
  "panda",
  "fox",
  "birb",
  "koala",
  "kangaroo",
  "racoon",
  "elephant",
  "giraffe",
  "whale",
];

@ApplyOptions<CustomCommandOptions>({
  name: "animalfact",
  description: "Now you can know everything about your favourite animals.",
  aliases: animals.map((e) => e + "fact"),
  category: "Fun",
  argString: "(animal type)",
})
export default class FactCommand extends CustomCommand {
  async run(
    message: Message,
    args: Args,
    cmdContext: CommandContext
  ): Promise<Message> {
    let animal: string;
    const picked = await args.pickResult("string");

    if (cmdContext.commandName === this.name)
      animal = picked.success ? picked.value : "";
    else animal = cmdContext.commandName.split("fact")[0];

    if (!animals.includes(animal))
      return message.channel.send({
        embeds: [
          ErrorEmbed(
            "You must provide a valid/supported type of animal!"
          ).addField(
            "Supported Animal Types",
            animals.map((e) => `\`${e}\``).join(", ")
          ),
        ],
      });

    const cache = (this.context.client as CustomClient).requestCache;
    let data: string;
    try {
      data = (
        (await fetch(
          "https://some-random-api.ml/facts/" + animal,
          FetchResultTypes.JSON
        )) as { fact: string }
      ).fact;
      cache.add(animal, data);
    } catch {
      data = cache.getRandom(animal);
      if (!data)
        return message.channel.send({
          embeds: [
            ErrorEmbed(
              "An internal error occured while trying to execute that command."
            ),
          ],
        });
    }

    const embed = BasicEmbed(data).setColor("RANDOM");

    return message.channel.send({ embeds: [embed] });
  }
}
