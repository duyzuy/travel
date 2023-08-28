import { GENDER, PASSENGER_TYPE, PASSENGER_TITLE } from "@/constants/enum";
export const getPassengerGenderFromTitle = (
  passengerTitle: PASSENGER_TITLE
) => {
  if (passengerTitle === PASSENGER_TITLE.MR) return GENDER.MALE;
  if (
    passengerTitle === PASSENGER_TITLE.MRS ||
    passengerTitle === PASSENGER_TITLE.MS
  )
    return GENDER.FEMALE;

  return "";
};
