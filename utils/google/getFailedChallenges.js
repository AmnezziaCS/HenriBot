const { google } = require("googleapis");

async function getFailedChallenges(auth, targetCell, daysDifference) {
  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `!${targetCell}2:${targetCell}${2 + daysDifference}`,
  });

  const rows = response.data.values;
  let totalFails = 0;

  if (!rows || rows.length === 0) {
    console.log("No challenges failed.");
    return 0;
  }
  rows.forEach((value) => {
    if (value[0] === "x") {
      totalFails++;
    }
  });
  return totalFails;
}

module.exports = getFailedChallenges;
