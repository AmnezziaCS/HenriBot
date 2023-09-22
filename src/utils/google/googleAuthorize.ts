import { authenticate } from "@google-cloud/local-auth";
import {
  loadSavedCredentialsIfExist,
  saveCredentials,
} from "./googleCredentialsManager";
import path from "path";
import { OAuth2Client } from "google-auth-library";

// File provided by Google API documentation.

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

// Load or request or authorization to call APIs.

export const authorize = async (): Promise<OAuth2Client> => {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
};
