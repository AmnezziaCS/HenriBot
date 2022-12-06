const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dailychallenge")
    .setDescription("Inscrire les résultats du challenge du jour !")
    .addStringOption((option) =>
      option
        .setName("result")
        .setDescription("Le résultat du challenge.")
        .setRequired(true)
        .addChoices(
            { name: 'Réussi', value: "YES" },
            { name: 'Perdu', value: "NO" },
        )
    )
    .setDMPermission(false),
  aliases: ["challenge"],
  execute({ client: client, interaction: interaction }) {
    var buffer = interaction.options.getString("result") === "YES"
      ? "Je note que le challenge est réussi <:peepoFlushed:918094710969597952>"
      : "Je note que le challenge est échoué <:Sadge:920699839182954526>";
    return interaction.reply({ content: buffer });
  },
};
