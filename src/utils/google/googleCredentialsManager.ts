import { google } from "googleapis";
import { promises as fs } from "fs";
import path from "path";
import { OAuth2Client } from "google-auth-library";

// File provided by Google API documentation.

const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 */
export const loadSavedCredentialsIfExist = async (): Promise<OAuth2Client | null> => {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content as any);
    return google.auth.fromJSON(credentials) as OAuth2Client;
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 */
export const saveCredentials = async (client: OAuth2Client): Promise<void> => {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content as any);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}
