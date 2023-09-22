import { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export const beloved = {
  data: new SlashCommandBuilder()
    .setName("beloved")
    .setDescription("Henri my beloved 😋")
    .setDMPermission(false),
  aliases: ["loved"],
  execute({ interaction }: { interaction: ChatInputCommandInteraction }) {
    return interaction.reply(
      "https://media.discordapp.net/attachments/1025395705210216449/1049309004624572446/henrimybeloved.gif"
    );
  },
};
