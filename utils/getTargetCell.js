const nameTable = {
  Henri: "B",
  Pierre: "C",
  Amandine: "D",
  Hugo: "E",
  Mathys: "F",
  Djibril: "G",
};

const getTargetCell = (interaction) => {
  let targetCell;
  Object.entries(nameTable).every((entry) => {
    if (entry[0].includes(interaction.options.getString("name"))) {
      targetCell = entry[1];
      return false;
    }
    return true;
  });
  return targetCell;
};

module.exports = getTargetCell;
