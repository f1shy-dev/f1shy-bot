import {
  Command,
  CommandOptions,
  PermissionsPrecondition,
  PieceContext,
  PreconditionEntryResolvable,
} from "@sapphire/framework";
import { EmbedFieldData, PermissionResolvable } from "discord.js";

export type CustomCommandOptions = CommandOptions & {
  category: string;
  argString?: string;
  examples?: string[];
  extraInfoFields?: EmbedFieldData[];
  nsfw?: boolean;
  botPermissions?: PermissionResolvable[];
  cooldown?: string;
  usage?: string;
};

export abstract class CustomCommand extends Command {
  public readonly category: string;
  public readonly examples?: string[];
  public readonly extraInfoFields?: EmbedFieldData[];
  public readonly nsfw?: boolean;
  public readonly usage?: string;

  public constructor(context: PieceContext, options: CustomCommandOptions) {
    super(context, CustomCommand.resolvePreconditions(context, options));

    this.category = options.category;
    this.examples = options.examples ??= [];
    this.extraInfoFields = options.extraInfoFields ??= [];
    this.nsfw = options.nsfw ??= false;
    this.usage = `${options.name}${
      options.argString ? " " + options.argString : ""
    }`;
  }

  protected static resolvePreconditions(
    _: PieceContext,
    options: CustomCommandOptions
  ): CustomCommandOptions {
    const preconditions = (options.preconditions ??=
      []) as PreconditionEntryResolvable[];

    if (options.nsfw) preconditions.push("NSFW");

    if (options.botPermissions)
      preconditions.concat(
        options.botPermissions.map((p) => new PermissionsPrecondition(p))
      );

    if (options.cooldown) {
      const matches = [
        ...options.cooldown.matchAll(/^(\d+)(usages\/)(\d+)(sec|min|hour)$/g),
      ].flat();
      if (!matches[0]) throw new Error("Invalid Cooldown string.");
      const limit = Number(matches[1]);
      const rate = Number(matches[3]);
      const interval = matches[4];
      let delay = 1000 * rate;
      if (interval == "min") delay = delay * 60;
      if (interval == "hour") delay = delay * 60 * 60;

      preconditions.push({
        name: "Cooldown",
        context: { limit, delay },
      });
    }
    return options;
  }
}
