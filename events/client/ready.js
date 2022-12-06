module.exports = (client) => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setActivity("Effectuer le Henri Challenge");
  client.user.setStatus("dnd");
};
