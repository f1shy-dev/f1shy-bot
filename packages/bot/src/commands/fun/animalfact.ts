import type { Message } from "discord.js";
import { Args, CommandContext } from "@sapphire/framework";

import { BasicEmbed, ErrorEmbed } from "../../lib/EmbedBuilders";
import { fetch, FetchResultTypes } from "@sapphire/fetch";
import {
  CustomCommand,
  CustomCommandOptions,
} from "../../structures/CustomCommand";
import { ApplyOptions } from "@sapphire/decorators";

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
  extraInfoFields: [
    {
      name: "Supported Animal Types",
      value: animals.map((e) => `\`${e}\``).join(", "),
    },
  ],
})
export default class FactCommand extends CustomCommand {
  async run(
    message: Message,
    args: Args,
    cmdContext: CommandContext
  ): Promise<unknown> {
    message.channel.sendTyping();
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

    const cache = this.client.requestCache;
    let data: string;
    let fromCache = false;
    try {
      data = (
        (await fetch(
          "https://some-random-api.ml/facts/" + animal,
          FetchResultTypes.JSON
        )) as { fact: string }
      ).fact;
    } catch {
      data = cache.getRandom(animal);
      fromCache = true;
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

    message.channel.send({ embeds: [embed] });
    if (!fromCache) cache.add(animal, data);
  }
}
