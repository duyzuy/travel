import { makeVar } from "@apollo/client";
import {
  IPassengerInformationFormValue,
  PassengerInformationStore,
} from "./passengerInformation.interface";
import { PASSENGER_TITLE } from "@/constants/enum";

const passengerInformationInit = new PassengerInformationStore(
  [],
  PASSENGER_TITLE.MR,
  "",
  "",
  "",
  ""
);
export const passengerInformationVar = makeVar<IPassengerInformationFormValue>(
  passengerInformationInit
);
