export type NamesEnum = "Henri" | "Pierre" | "Amandine" | "Hugo" | "Mathys";

export const nameTable: Record<NamesEnum, string> = {
  Henri: "B",
  Pierre: "C",
  Amandine: "D",
  Hugo: "E",
  Mathys: "F",
};

export type ProductShortEnum = "C" | "S" | "M" | "B4" | "B10";
export type ProductEnum =
  | "classic"
  | "small"
  | "milka"
  | "beignet4"
  | "beignet10";

export const productConversionTable: Record<ProductShortEnum, ProductEnum> = {
  C: "classic",
  S: "small",
  M: "milka",
  B4: "beignet4",
  B10: "beignet10",
};

export const embedColorCode = "#dfeefc";
export const donutURL = `https://media.istockphoto.com/id/538335769/fr/photo/beignet-avec-confettis-en-sucre-isol%C3%A9.jpg?s=612x612&w=0&k=20&c=5ABjKAsyFwFNflL6BhabjmsRod2X5ZZVMBpohEjh304=`;

export const discordEmojiArray: Record<string, string> = {
  HMMM: '<:hmmmm:898672241787674634>',
  PEPOG: '<:pepoG:948676211213758474>',
  WAITING: '<:waiting:918125217862287370>',
  DCOLON: '<:DCOLON:842898126645362758>',
  NOPERS: '<a:NOPERS:804801139702628392>',
  NODDERS: '<a:NODDERS:804418094625718362>',
  YEP: '<:YEP:800841093515444244>',
  UPVOTE: '<:upvote:918125657601499176>',
  MADGE: '<:Madge:836688670316691486>',
  SADGE: '<:Sadge:920699839182954526>',
  AGONY: '<:agony:918124977352499200>'
};