import { Command, CommandOptions } from "@sapphire/framework";

export type CustomCommandOptions = CommandOptions & {
  category: string;
  usage?: string;
  examples?: string[];
};

export type CustomCommand = Command & CustomCommandOptions;
