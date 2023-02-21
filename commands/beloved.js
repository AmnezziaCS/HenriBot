const { SlashCommandBuilder } = require("@discordjs/builders");
const { google } = require("googleapis");
const authorize = require("../utils/googleAuthorize");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beloved")
    .setDescription("Henri my beloved 😋")
    .setDMPermission(false),
  aliases: ["loved"],
  execute({ client: client, interaction: interaction }) {
    /**
     * Prints the names and majors of students in a sample spreadsheet:
     * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
     * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
     */
    async function listMajors(auth) {
      const sheets = google.sheets({ version: "v4", auth });
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
        range: "Class Data!A2:E",
      });
      const rows = res.data.values;
      if (!rows || rows.length === 0) {
        console.log("No data found.");
        return;
      }
      console.log("Name, Major:");
      rows.forEach((row) => {
        // Print columns A and E, which correspond to indices 0 and 4.
        console.log(`${row[0]}, ${row[4]}`);
      });
    }

    authorize().then(listMajors).catch(console.error);

    return interaction.reply(
      "https://media.discordapp.net/attachments/1025395705210216449/1049309004624572446/henrimybeloved.gif"
    );
  },
};
