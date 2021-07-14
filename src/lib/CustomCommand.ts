import { Command } from "@sapphire/framework";
import { CustomCommandOptions } from "./ApplyCommandOptions";

export type CustomCommand = Command & CustomCommandOptions;
