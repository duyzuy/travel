import { makeVar } from "@apollo/client";

export enum BRANDS {
  VN = "VN",
  VJ = "VJ",
  QH = "QH",
}

export enum DEPARTURE_TIMES {
  EARLY_MORNING = "EARLY_MORNING",
  MONRNING = "MONRNING",
  AFTERNOON = "AFTERNOON",
  NIGHT = "NIGHT",
}
export enum FILTER_KEYS {
  BRAND = "brands",
  DEPARTIME = "departTimes",
}
export type Brands = string[];
export type DepartTimes = string[];
export const flightsFilterVar = makeVar<{
  [FILTER_KEYS.BRAND]: Brands;
  [FILTER_KEYS.DEPARTIME]: DepartTimes;
}>({
  [FILTER_KEYS.BRAND]: [BRANDS.VN],
  [FILTER_KEYS.DEPARTIME]: [DEPARTURE_TIMES.EARLY_MORNING],
});
