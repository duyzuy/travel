import { GENDER, PASSENGER_TITLE, PASSENGER_TYPE } from "@/constants/enum";

export interface IPassengerInformationFormValue {
  passengers: {
    title: PASSENGER_TITLE;
    firstName: string;
    lastName: string;
    birthDate?: {
      dateStr: string;
      date: Date;
    };
    gender: GENDER;
    isContact: boolean;
    type: PASSENGER_TYPE;
    dependent: string | null;
  }[];
  title: PASSENGER_TITLE;
  contactFirstName: string;
  contactLastName: string;

  contactPhone: string;
  contactGender: GENDER;
  contactEmail: string;
}

export class PassengerInformationStore
  implements IPassengerInformationFormValue
{
  passengers: {
    title: PASSENGER_TITLE;
    firstName: string;
    lastName: string;
    birthDate?: {
      dateStr: string;
      date: Date;
    };
    gender: GENDER;
    isContact: boolean;
    type: PASSENGER_TYPE;
    dependent: string | null;
  }[];
  title: PASSENGER_TITLE;
  contactFirstName: string;
  contactLastName: string;
  contactPhone: string;
  contactGender: GENDER;
  contactEmail: string;

  constructor(
    passengers: {
      title: PASSENGER_TITLE;
      firstName: string;
      lastName: string;
      birthDate?: {
        dateStr: string;
        date: Date;
      };
      gender: GENDER;
      isContact: boolean;
      type: PASSENGER_TYPE;
      dependent: string | null;
    }[],
    title: PASSENGER_TITLE,
    contactFirstName: string,
    contactLastName: string,

    contactPhone: string,
    contactEmail: string
  ) {
    this.title = title;
    this.contactEmail = contactEmail;
    this.contactGender = this.getGenderFromPassengerTitle(title);
    this.contactPhone = contactPhone;
    this.contactFirstName = contactFirstName;
    this.contactLastName = contactLastName;
    this.passengers = passengers;
  }

  getGenderFromPassengerTitle(passengerTitle: PASSENGER_TITLE) {
    if (
      passengerTitle === PASSENGER_TITLE.MRS ||
      passengerTitle === PASSENGER_TITLE.MS
    ) {
      return GENDER.FEMALE;
    }

    return GENDER.MALE;
  }
}
