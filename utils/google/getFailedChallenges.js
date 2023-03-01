const { google } = require("googleapis");

async function getFailedChallenges(auth, targetCell, daysDifference) {
  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `!${targetCell}2:${targetCell}${2 + daysDifference}`,
  });

  const rows = response.data.values;
  let totalFails = {
    classic: 0,
    small: 0
  }

  if (!rows || rows.length === 0) {
    console.log("No challenges failed.");
    return totalFails;
  }
  rows.forEach((value) => {
    if (value[0] === "C") {
      return totalFails.classic++;
    }
    if (value[0] === "S") {
      return totalFails.small++;
    }
  });
  return totalFails;
}

module.exports = getFailedChallenges;
