import { Client, Events } from "discord.js";
import * as events from "../events/index";

export const eventHandler = (client: Client) => {
  client.on(Events.ClientReady, events.ready.bind(client));
  client.on(Events.InteractionCreate, (interaction) => {
    events.interactionCreate(client, interaction);
  });
};
