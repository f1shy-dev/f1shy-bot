import {
  ApiRequest,
  ApiResponse,
  methods,
  Route,
  RouteOptions,
} from "@sapphire/plugin-api";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<RouteOptions>({ route: "/" })
export class MainRoute extends Route {
  public [methods.GET](_: ApiRequest, res: ApiResponse): void {
    res.json({ message: "Hello, World!" });
  }
}
