import { PASSENGER_TITLE } from "@/constants/flight";
import { GENDER, PAX_TYPE } from "./enum";
export const recurringValues = {
  MONDAY: "monday",
  TUESDAY: "tuesday",
  WEDNESDAY: "wednesday",
  THURSDAY: "thursday",
  FRIDAY: "friday",
  SATURDAY: "saturday",
  SUNDAY: "sunday",
};

export const recurringLabel = {
  [recurringValues.MONDAY]: "Thứ Hai",
  [recurringValues.TUESDAY]: "Thứ Ba",
  [recurringValues.WEDNESDAY]: "Thứ Tư",
  [recurringValues.THURSDAY]: "Thứ Năm",
  [recurringValues.FRIDAY]: "Thứ Sáu",
  [recurringValues.SATURDAY]: "Thứ Bảy",
  [recurringValues.SUNDAY]: "Chủ Nhật",
};

export const TIME_CLIENT_FORMAT = "DD/MM/YYYY hh:mm:ss";

export const bookingStatuses = {
  PENDING: "PENDING",
  CONFIRM: "CONFIRMED",
  CANCELED: "CANCELED",
  EXPIRED: "EXPIRED",
};

export const bookingItemStatuses = {
  PENDING: "PENDING",
  CONFIRM: "CONFIRMED",
  CANCELED: "CANCELED",
};

export const dataStatuses = {
  ACTIVE: "ACTIVE",
  IN_ACTIVE: "IN_ACTIVE",
};

export const GENDER_CONFIG = {
  [GENDER.MALE]: {
    label: "Ông",
    value: GENDER.MALE,
  },
  [GENDER.FEMALE]: {
    label: "Bà",
    value: GENDER.FEMALE,
  },
};
export const getGenderConfig = (gender: GENDER) => {
  return GENDER_CONFIG[gender];
};

export const getPassengerTitleByGender = (
  gender: GENDER,
  passengerType: PAX_TYPE
) => {
  if (passengerType === PAX_TYPE.INFANT) return PASSENGER_TITLE.Infant;
  if (gender === GENDER.MALE) return PASSENGER_TITLE.Mr;
  if (gender === GENDER.FEMALE) return PASSENGER_TITLE.Ms;
  return "";
};
