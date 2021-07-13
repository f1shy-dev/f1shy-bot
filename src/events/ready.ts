import { Event, PieceContext } from "@sapphire/framework";

export default class ReadyEvent extends Event {
  constructor(context: PieceContext) {
    super(context, {
      once: true,
    });
  }

  async run(): Promise<void> {
    this.context.logger.info(
      `[INFO] Logged in as ${this.context.client.user?.tag}`
    );
  }
}
