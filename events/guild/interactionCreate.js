module.exports = async (client, interaction) => {
  if (!interaction.type === "APPLICATION_COMMAND") return;

  let parameterBuffer = "";
  interaction.options._hoistedOptions.forEach((parameter) => {
    parameterBuffer += ` [${parameter.name}: ${parameter.value}]`;
  });
  console.log(
    `${new Date().toLocaleString()} ${interaction.user.username}#${
      interaction.user.discriminator
    } : /${interaction.commandName}${parameterBuffer}`
  );

  const command =
    client.commands.get(interaction.commandName) ||
    client.commands.find(
      (a) => a.aliases && a.aliases.includes(interaction.commandName)
    );

  if (!command)
    return interaction.reply(
      "Quelque chose n'a pas tourné rond, bizarre. Soit votre commande n'existe pas, soit elle est erronée <:hmmmm:918094679302606878>"
    );

  try {
    await command.execute({ client, interaction });
  } catch (err) {
    interaction.reply(
      "Quelque chose n'a pas tourné rond, bizarre. Soit votre commande n'existe pas, soit elle est erronée <:hmmmm:918094679302606878>"
    );
    console.log("Caught error:", err);
  }
};
