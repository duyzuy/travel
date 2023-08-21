import { makeVar } from "@apollo/client";

export enum BRANDS {
  VN = "VN",
  VJ = "VJ",
  QH = "QH",
}

export enum DEPARTURE_TIMES {
  EARLY_MORNING = "EARLY_MORNING",
  MORNING = "MORNING",
  AFTERNOON = "AFTERNOON",
  NIGHT = "NIGHT",
}
export enum FILTER_KEYS {
  BRAND = "brands",
  DEPARTIME = "departTimes",
  SORTING = "sorting",
}
export enum SORTS_ENUM {
  LOWEST = "lowest",
  EARLY = "early",
  FASTEST = "fastest",
}

export type Brands = string[];
export type DepartTimes = string[];

export const flightsFilterVar = makeVar<{
  [FILTER_KEYS.BRAND]: Brands;
  [FILTER_KEYS.DEPARTIME]: DepartTimes;
  [FILTER_KEYS.SORTING]: SORTS_ENUM;
}>({
  [FILTER_KEYS.BRAND]: [],
  [FILTER_KEYS.DEPARTIME]: [],
  [FILTER_KEYS.SORTING]: SORTS_ENUM.LOWEST,
});
