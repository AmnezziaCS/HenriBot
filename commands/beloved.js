const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beloved")
    .setDescription("Henri my beloved 😋")
    .setDMPermission(false),
  aliases: ["loved"],
  execute({ client: client, interaction: interaction }) {
    return interaction.reply(
      "https://media.discordapp.net/attachments/1025395705210216449/1049309004624572446/henrimybeloved.gif"
    );
  },
};
