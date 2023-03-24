const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const authorize = require("../utils/google/googleAuthorize");
const getTargetCell = require("../utils/getTargetCell");
const getFailedChallenges = require("../utils/getFailedChallenges");

// Using the divide by 100 method for currency
const donutPrices = {
  classicDonutPrice: 160,
  smallDonutPrice: 100,
  milkaDonutPrice: 290,
  chocoBeignet4Price: 300,
  chocoBeignet10Price: 360,
};
const sheetStartingDate = new Date(
  `${process.env.SHEET_STARING_DATE} 00:00:00`
);

const moneySpentEmbed = (interaction, totalPrice) => {
  return new EmbedBuilder()
    .setColor("#dfeefc")
    .setAuthor({
      name: `Voici l'argent total dépensé par ${interaction.options.getString(
        "name"
      )} !`,
      iconURL: `https://media.istockphoto.com/id/538335769/fr/photo/beignet-avec-confettis-en-sucre-isol%C3%A9.jpg?s=612x612&w=0&k=20&c=5ABjKAsyFwFNflL6BhabjmsRod2X5ZZVMBpohEjh304=`,
      url: "https://docs.google.com/spreadsheets/d/1_9VKhiAp9E4STmI9wpgV3mRElIXjzxhKiF9BlIiGNWM",
    })
    .setDescription(
      `${interaction.options.getString("name")} a dépensé ${
        totalPrice === 0
          ? interaction.options.getString("name") != "Amandine"
            ? "0€ quel boss"
            : "0€ quelle bosse"
          : `${totalPrice.toFixed(
              2
            )}€, dommage, le Henri Challenge fait vraiment des ravages...`
      }`
    );
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("moneyspent")
    .setDescription("Donne le total d'argent dépensé par la personne !")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the student")
        .setRequired(true)
        .addChoices(
          { name: "Henri", value: "Henri" },
          { name: "Pierre", value: "Pierre" },
          { name: "Amandine", value: "Amandine" },
          { name: "Hugo", value: "Hugo" },
          { name: "Mathys", value: "Mathys" },
          { name: "Djibril", value: "Djibril" }
        )
    )
    .setDMPermission(false),
  aliases: ["money"],
  async execute({ client: client, interaction: interaction }) {
    const auth = await authorize();
    const targetCell = getTargetCell(interaction);
    const daysDifference = Math.floor(
      (new Date() - sheetStartingDate) / 86400000
    );
    
    const totalFailsObject = await getFailedChallenges(
      auth,
      targetCell,
      daysDifference
    ).catch(console.error);

    const totalPrice =
      (totalFailsObject.classic * donutPrices.classicDonutPrice) / 100 +
      (totalFailsObject.small * donutPrices.smallDonutPrice) / 100 +
      (totalFailsObject.milka * donutPrices.milkaDonutPrice) / 100 +
      (totalFailsObject.beignet4 * donutPrices.chocoBeignet4Price) / 100 +
      (totalFailsObject.beignet10 * donutPrices.chocoBeignet10Price) / 100;

    return interaction.reply({
      embeds: [moneySpentEmbed(interaction, totalPrice)],
    });
  },
};
