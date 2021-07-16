import { MessageEmbed } from "discord.js";

export const ErrorEmbed = (message: string) =>
  new MessageEmbed()
    .setColor("#E53935")
    .setDescription("<:WrongMark:864444373776990228> " + message);

export const SuccessEmbed = (message: string) =>
  new MessageEmbed()
    .setColor("#7CB342")
    .setDescription("<:CheckMark:864444373705687070>  " + message);

export const ImageEmbed = (url: string) =>
  new MessageEmbed().setColor("#0099ff").setImage(url);

export const BasicEmbed = (title = "") =>
  new MessageEmbed().setColor("#42A5F5").setTitle(title);