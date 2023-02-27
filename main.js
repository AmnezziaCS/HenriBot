require("dotenv").config();

const { Client, Collection, GatewayIntentBits } = require("discord.js");

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

["command_handler", "event_handler", "slash_command_handler"].forEach(
  (handler) => {
    require(`./handlers/${handler}`)(client);
  }
);

process.on("unhandledRejection", (e) => console.error(e));
client.login(process.env.DISCORD_TOKEN);

console.log("test")
