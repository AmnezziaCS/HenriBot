import { Client, Collection, GatewayIntentBits } from "discord.js";
import { ENV } from "./env";
import * as handlers from "./handlers"; 

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
client.commands = new Collection();
client.events = new Collection();

Object.values(handlers).forEach((handler) => handler(client));

process.on("unhandledRejection", (e) => console.error(e));
client.login(ENV.DISCORD_TOKEN);
