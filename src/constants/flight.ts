import { PASSENGER_TITLE } from "./enum";

export enum CHARGE_TYPE {
  FA = "FA",
  SA = "SA",
  AS = "AS",
  AI = "AI",
  AM = "AM",
  MF = "MF",
}

export enum AIRLINE_CODE {
  VJ = "VJ",
  VZ = "VZ",
}

export const PASSENGER_TITLE_OPTIONS = [
  {
    id: 1,
    name: PASSENGER_TITLE.MR,
    nameVi: "Ông",
    value: PASSENGER_TITLE.MR,
  },
  {
    id: 2,
    name: PASSENGER_TITLE.MRS,
    nameVi: "Bà",
    value: PASSENGER_TITLE.MRS,
  },
  {
    id: 3,
    name: PASSENGER_TITLE.MS,
    nameVi: "Cô/Chị",
    value: PASSENGER_TITLE.MS,
  },
];
