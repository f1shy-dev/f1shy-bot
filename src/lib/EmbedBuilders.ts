import { MessageEmbed } from "discord.js";

export const ErrorEmbed = (message: string) =>
  new MessageEmbed()
    .setColor("#E53935")
    .setDescription("<:cross:806285443062169620> " + message);

export const SuccessEmbed = (message: string) =>
  new MessageEmbed()
    .setColor("#7CB342")
    .setDescription("<:success:806285442839609365>  " + message);

export const ImageEmbed = (url: string) =>
  new MessageEmbed().setColor("BLUE").setImage(url);

export const BasicEmbed = (title = "") =>
  new MessageEmbed().setColor("#42A5F5").setTitle(title);
