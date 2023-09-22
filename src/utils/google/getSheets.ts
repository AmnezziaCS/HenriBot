import { google } from "googleapis";
import { authorize } from "./googleAuthorize";

export const getSheets = async () => {
  const auth = await authorize();
  return google.sheets({ version: "v4", auth });
};
