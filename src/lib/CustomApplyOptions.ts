import { ApplyOptions } from "@sapphire/decorators";
import { CommandOptions } from "@sapphire/framework";

type T = CommandOptions & { category: string };
type F = (optionsOrFn: T) => ClassDecorator;
export const CustomApplyOptions: F = (options) => (C) => {
  const c = ApplyOptions(options)(C) || C;

  Object.assign(c.prototype, options);
  return c;
};
