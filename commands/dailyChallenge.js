const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { google } = require("googleapis");
const dateFormatter = require("../utils/dateFormatter");
const authorize = require("../utils/google/googleAuthorize");
const getTargetCell = require("../utils/getTargetCell");

const sheetStartingDate = new Date(`${process.env.SHEET_STARING_DATE} 00:00:00`);

const challengeCompletedEmbed = (interaction) => {
  return new EmbedBuilder()
    .setColor("#dfeefc")
    .setAuthor({
      name: `Le Henri Challenge est réussi !`,
      iconURL: `https://media.istockphoto.com/id/538335769/fr/photo/beignet-avec-confettis-en-sucre-isol%C3%A9.jpg?s=612x612&w=0&k=20&c=5ABjKAsyFwFNflL6BhabjmsRod2X5ZZVMBpohEjh304=`,
      url: 'https://docs.google.com/spreadsheets/d/1_9VKhiAp9E4STmI9wpgV3mRElIXjzxhKiF9BlIiGNWM'
    })
    .setDescription(
      `Bravo à ${interaction.options.getString("name")} pour avoir réussi le Henri Challenge !`
    )
    .addFields({ name: 'Statut de la sheet', value: 'La google sheet a bien été update ✅', inline: true });
};

const challengeFailedEmbed = (interaction) => {
  return new EmbedBuilder()
    .setColor("#dfeefc")
    .setAuthor({
      name: `Le Henri Challenge est perdu !`,
      iconURL: `https://media.istockphoto.com/id/538335769/fr/photo/beignet-avec-confettis-en-sucre-isol%C3%A9.jpg?s=612x612&w=0&k=20&c=5ABjKAsyFwFNflL6BhabjmsRod2X5ZZVMBpohEjh304=`,
      url: 'https://docs.google.com/spreadsheets/d/1_9VKhiAp9E4STmI9wpgV3mRElIXjzxhKiF9BlIiGNWM'
    })
    .setDescription(
      `Dommage, ${interaction.options.getString("name")} n'a pas réussi le Henri Challenge aujourd'hui !`
    )
    .addFields({ name: 'Statut de la sheet', value: 'La google sheet a bien été update ✅', inline: true });
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dailychallenge")
    .setDescription("Inscrire les résultats du challenge du jour !")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the student")
        .setRequired(true)
        .addChoices(
          { name: "Henri", value: "Henri" },
          { name: "Pierre", value: "Pierre" },
          { name: "Alexis", value: "Alexis" },
          { name: "Amandine", value: "Amandine" },
          { name: "Hugo", value: "Hugo" },
          { name: "Mathys", value: "Mathys" },
          { name: "Djibril", value: "Djibril" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("result")
        .setDescription("Le résultat du challenge.")
        .setRequired(true)
        .addChoices(
          { name: "Réussi", value: "YES" },
          { name: "Perdu", value: "NO" }
        )
    )
    .setDMPermission(false),
  aliases: ["challenge"],
  execute({ client: client, interaction: interaction }) {
    const daysDifference = Math.floor(
      (new Date() - sheetStartingDate) / 86400000
    );
    const targetCell = getTargetCell(interaction);

    async function alterateSheet(auth) {
      const sheets = google.sheets({ version: "v4", auth });
      const getDatesResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: `!A2:A${2 + daysDifference}`,
      });
      const datesRows = getDatesResponse.data.values;

      if (!datesRows || datesRows.length === 0) {
        console.log("No data found.");
        return;
      }

      const count = datesRows.length;
      let bufferDay = new Date(`${rows[count - 1][0]} 00:00:00`);
      const missingDays = daysDifference - count + 1; // +1 being the original day

      for (i = 1; i < missingDays + 1; i++) {
        bufferDay.setDate(bufferDay.getDate() + 1);
        const missingDatesValues = [[dateFormatter(bufferDay)]];
        const missingDatesresource = {
          values: missingDatesValues,
        };

        const dateSheetRes = await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.SHEET_ID,
          range: `!A${i + count}`,
          valueInputOption: "RAW",
          resource: missingDatesresource,
        });
      }

      const challengeOutcomeValues =
        interaction.options.getString("result") === "YES" ? [[""]] : [["x"]];
      let challengeOutcomeResource = {
        values: challengeOutcomeValues,
      };

      const challengeOutcomeResponse = await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.SHEET_ID,
        range: `!${targetCell}${2 + daysDifference}`,
        valueInputOption: "RAW",
        resource: challengeOutcomeResource,
      });
    }

    authorize().then(alterateSheet).catch(console.error);

    return interaction.reply({
      embeds:
        interaction.options.getString("result") === "YES"
          ? [challengeCompletedEmbed(interaction)]
          : [challengeFailedEmbed(interaction)],
    });
  },
};
