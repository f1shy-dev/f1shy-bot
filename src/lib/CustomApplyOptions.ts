import { ApplyOptions } from "@sapphire/decorators";
import { CommandOptions } from "@sapphire/framework";

export type CustomCommandOptions = CommandOptions & {
  category: string;
  usage?: string;
  examples?: string[];
};

type F = (optionsOrFn: CustomCommandOptions) => ClassDecorator;
export const CustomApplyOptions: F = (options) => (C) => {
  const c = ApplyOptions(options)(C) || C;

  Object.assign(c.prototype, options);
  return c;
};
