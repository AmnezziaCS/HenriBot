import { Client, Interaction } from "discord.js";
import { discordEmojiArray } from "../../utils/constants";

export const interactionCreate = async (
  client: Client,
  interaction: Interaction
) => {
  if (!interaction.isCommand()) return;

  const command =
    client.commands.get(interaction.commandName) ||
    client.commands.find(
      (command) =>
        command.aliases && command.aliases.includes(interaction.commandName)
    );

  if (!command) {
    return interaction.reply({
      content: `Quelque chose n'a pas tourné rond, bizarre. Soit votre commande n'existe pas, soit elle est erronée ${discordEmojiArray.HMMM}`,
      ephemeral: true,
    });
  }

  const parameterBuffer = interaction.options.data.reduce(
    (acc: string, cur) => {
      return acc + " " + cur.value;
    },
    ""
  );
  const discriminator =
    interaction.user.discriminator === "0"
      ? ""
      : `#${interaction.user.discriminator}`;

  console.log(
    `(${new Date().toLocaleString()}) - ${
      interaction.user.username
    }${discriminator}: /${interaction.commandName}${parameterBuffer}`
  );

  try {
    await command.execute({ client, interaction });
  } catch (err) {
    interaction.reply({
      content: `Quelque chose n'a pas tourné rond, bizarre. Soit votre commande n'existe pas, soit elle est erronée ${discordEmojiArray.HMMM}}`,
      ephemeral: true,
    });
    console.log("Caught error:", err);
  }
};
