import { NamesEnum, nameTable } from "./constants";

export const getTargetCell = (target: NamesEnum): string => {
  return nameTable[target];
};
