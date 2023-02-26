const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { google } = require("googleapis");
const dateFormatter = require("../utils/dateFormatter");
const authorize = require("../utils/googleAuthorize");

const sheetStartingDate = new Date(process.env.SHEET_STARING_DATE);

const nameTable = {
  Henri: "B",
  Pierre: "C",
  Alexis: "D",
  Amandine: "E",
  Hugo: "F",
  Mathys: "G",
  Djibril: "H",
};

const challengeCompletedEmbed = (interaction) => {
  return new EmbedBuilder()
    .setColor("#dfeefc")
    .setAuthor({
      name: `Le Henri Challenge 🍩 est réussi !`,
      iconURL: `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.jpeg`,
      url: 'https://docs.google.com/spreadsheets/d/1_9VKhiAp9E4STmI9wpgV3mRElIXjzxhKiF9BlIiGNWM'
    })
    .setDescription(
      `Bravo à ${interaction.options.getString("name")} pour avoir réussi le Henri Challenge <:peepobusiness:918125040388669440>`
    )
    .addFields({ name: 'Statut de la sheet', value: 'La google sheet a bien été update ✅', inline: true });
};

const challengeFailedEmbed = (interaction) => {
  return new EmbedBuilder()
    .setColor("#dfeefc")
    .setAuthor({
      name: `Le Henri Challenge 🍩 est perdu !`,
      iconURL: `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.jpeg`,
      url: 'https://docs.google.com/spreadsheets/d/1_9VKhiAp9E4STmI9wpgV3mRElIXjzxhKiF9BlIiGNWM'
    })
    .setDescription(
      `Dommage, ${interaction.options.getString("name")} n'a pas réussi le Henri Challenge aujourd'hui <:anger:928996461604143164>`
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

    async function alternateSheet(auth) {
      const sheets = google.sheets({ version: "v4", auth });
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: `!A2:A${2 + daysDifference}`,
      });
      const rows = res.data.values;

      if (!rows || rows.length === 0) {
        console.log("No data found.");
        return;
      }

      const count = rows.length;
      let bufferDay = new Date(rows[count - 1][0]);
      const missingDays = daysDifference - count + 1; // +1 being the original day

      for (i = 1; i < missingDays + 1; i++) {
        bufferDay.setDate(bufferDay.getDate() + 1);
        let values = [[dateFormatter(bufferDay)]];
        let resource = {
          values,
        };

        const dateSheetRes = await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.SHEET_ID,
          range: `!A${i + count}`,
          valueInputOption: "RAW",
          resource,
        });
      }

      let values =
        interaction.options.getString("result") === "YES" ? [[""]] : [["x"]];
      let resource = {
        values,
      };

      let targetCell;
      Object.entries(nameTable).every((entry) => {
        if (entry[0].includes(interaction.options.getString("name"))) {
          targetCell = entry[1];
          return false;
        }
        return true;
      });

      const challengeResultRes = await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.SHEET_ID,
        range: `!${targetCell}${2 + daysDifference}`,
        valueInputOption: "RAW",
        resource,
      });
    }

    authorize().then(alternateSheet).catch(console.error);

    return interaction.reply({
      embeds:
        interaction.options.getString("result") === "YES"
          ? [challengeCompletedEmbed(interaction)]
          : [challengeFailedEmbed(interaction)],
    });
  },
};
