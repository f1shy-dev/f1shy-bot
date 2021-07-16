import { ApplyOptions } from "@sapphire/decorators";
import { CustomCommandOptions } from "../structures/CustomCommand";
// import { CustomRouteOptions } from "../structures/CustomRouteOptions";

type F = (optionsOrFn: CustomCommandOptions) => ClassDecorator;
export const ApplyCustomOptions: F = (options) => (C) => {
  const c = ApplyOptions(options)(C) || C;

  Object.assign(c.prototype, options);
  return c;
};
