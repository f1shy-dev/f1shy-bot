import { Command } from "@sapphire/framework";
import { CustomCommandOptions } from "./CustomApplyOptions";

export type CustomCommand = Command & CustomCommandOptions;
