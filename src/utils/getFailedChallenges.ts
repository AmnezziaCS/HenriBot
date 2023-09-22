import { google } from "googleapis";
import { ENV } from "../env";
import { OAuth2Client } from "google-auth-library";
import { ProductEnum, ProductShortEnum, productConversionTable } from "./constants";

type TotalFails = Record<ProductEnum, number>;

export const getFailedChallenges = async (
  auth: OAuth2Client,
  targetCell: string,
  daysDifference: number
): Promise<TotalFails | undefined> => {
  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: ENV.SHEET_ID,
    range: `!${targetCell}2:${targetCell}${2 + daysDifference}`,
  });

  const rows = response.data.values;

  if (!rows || rows.length === 0) {
    console.log("No challenges failed.");
    return undefined;
  }

  const totalFails = rows?.reduce(
    (acc: TotalFails, value: ProductShortEnum[]): TotalFails => {
      if (!value[0]) return acc;
      acc[productConversionTable[value[0]]]++;
      return acc;
    },
    {
      classic: 0,
      small: 0,
      milka: 0,
      beignet4: 0,
      beignet10: 0,
    }
  );
  return totalFails;
};
