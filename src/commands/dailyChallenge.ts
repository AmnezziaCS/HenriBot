import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { dateFormatter } from "../utils/dateFormatter";
import { getTargetCell } from "../utils/getTargetCell";
import { ENV } from "../env";
import { NamesEnum, donutURL, embedColorCode } from "../utils/constants";
import { getSheetURL } from "../utils/getSheetURL";
import { getSheets } from "../utils/google/getSheets";

const sheetStartingDate = new Date(`${ENV.SHEET_STARTING_DATE} 00:00:00`);

export const dailychallenge = {
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
          { name: "Amandine", value: "Amandine" },
          { name: "Hugo", value: "Hugo" },
          { name: "Mathys", value: "Mathys" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("result")
        .setDescription("Le résultat du challenge.")
        .setRequired(true)
        .addChoices(
          { name: "Rien", value: "O" },
          { name: "Donuts classiques 1,60€", value: "C" },
          { name: "Donuts fins 1€", value: "S" },
          { name: "Donut milka 2,90€", value: "M" },
          { name: "Beignets choco x4 3,00€", value: "B4" },
          { name: "Beignets choco x10 3,60€", value: "B10" }
        )
    )
    .setDMPermission(false),
  aliases: ["challenge"],
  async execute({ interaction }: { interaction: ChatInputCommandInteraction }) {
    const targetName = interaction.options.getString("name") as NamesEnum;
    const challengeResult = interaction.options.getString("result") as string;
    const isChallengeCompleted = challengeResult === "O";

    const daysDifference = Math.floor(
      (new Date().getTime() - sheetStartingDate.getTime()) / 86400000
    );
    const targetCell = getTargetCell(targetName);

    const sheets = await getSheets();
    const getDatesResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: ENV.SHEET_ID,
      range: `!A2:A${2 + daysDifference}`,
    });
    const datesRows = getDatesResponse.data.values;

    if (!datesRows || datesRows.length === 0) {
      console.log("No data found.");
      return;
    }

    const count = datesRows.length;
    const missingDays = daysDifference - count + 1; // +1 being the original day

    let bufferDay = new Date(`${datesRows[count - 1][0]} 00:00:00`);

    for (let i = 1; i < missingDays + 1; i++) {
      bufferDay.setDate(bufferDay.getDate() + 1);
      const missingDatesValues = [[dateFormatter(bufferDay)]];
      const missingDatesresource = {
        values: missingDatesValues,
      };

      await sheets.spreadsheets.values.append({
        spreadsheetId: ENV.SHEET_ID,
        range: `!A${i + count}`,
        valueInputOption: "RAW",
        requestBody: missingDatesresource,
      });
    }

    const challengeResultValues = [
      [isChallengeCompleted ? "" : challengeResult],
    ];
    const challengeOutcomeResource = {
      values: challengeResultValues,
    };

    await sheets.spreadsheets.values.update({
      spreadsheetId: ENV.SHEET_ID,
      range: `!${targetCell}${2 + daysDifference}`,
      valueInputOption: "RAW",
      requestBody: challengeOutcomeResource,
    });

    const dailychallengeResponseEmbedTitle = isChallengeCompleted
      ? "Le Henri Challenge est réussi !"
      : "Le Henri Challenge est perdu !";
    const dailyChallengeResponseEmebedDescription = isChallengeCompleted
      ? `Bravo à ${targetName} pour avoir réussi le Henri Challenge !`
      : `Dommage, ${targetName} n'a pas réussi le Henri Challenge aujourd'hui !`;
    const dailyChallengeResponseEmbed = new EmbedBuilder()
      .setColor(embedColorCode)
      .setAuthor({
        name: dailychallengeResponseEmbedTitle,
        iconURL: donutURL,
        url: getSheetURL(ENV.SHEET_ID),
      })
      .setDescription(dailyChallengeResponseEmebedDescription)
      .addFields({
        name: "Statut de la sheet",
        value: "La google sheet a bien été update ✅",
        inline: true,
      });

    return interaction.reply({
      embeds: [dailyChallengeResponseEmbed],
    });
  },
};
