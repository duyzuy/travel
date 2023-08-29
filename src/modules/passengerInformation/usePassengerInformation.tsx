import { ReactiveVar, useReactiveVar } from "@apollo/client";
import {
  IPassengerInformationFormValue,
  PassengerInformationStore,
} from "./passengerInformation.interface";
import { bookingInformationVar } from "@/cache/vars";
import { IFlightBookingInformation } from "../bookingTicket/bookingInformation.interface";
import {
  PassengerBookingInformationType,
  ContactBookingInformationType,
} from "../bookingTicket/bookingInformation.interface";
import { GENDER, PASSENGER_TITLE, PASSENGER_TYPE } from "@/constants/enum";

const usePassengerInformation = (
  passengerInformationVar: ReactiveVar<IPassengerInformationFormValue>
) => {
  const passengerInfomationForm = passengerInformationVar();

  const bookingInformation = bookingInformationVar();

  const onAddPassengersInformation = (
    passengers: IPassengerInformationFormValue["passengers"]
  ) => {
    const passengerInformationUpdate = {
      ...passengerInfomationForm,
      passengers: passengers,
    };

    passengerInformationVar(passengerInformationUpdate);
  };

  const onAddContactInformation = (
    contactInfo: ContactBookingInformationType
  ) => {
    const newContactUpdate: IPassengerInformationFormValue = {
      ...passengerInfomationForm,
      ...contactInfo,
    };
    passengerInformationVar(newContactUpdate);
  };
  const onInitPassengerInformation = () => {
    const { passengerInformation, bookingInfo } = bookingInformation;
    const { passengers: person } = bookingInfo;

    if (!person) {
      return;
    }
    let initialPassengers: IPassengerInformationFormValue["passengers"] = [];

    //init passengers

    let _pIndex = 0;
    Object.keys(person).forEach((passengerType, _index) => {
      Array.from({
        length: person[passengerType as PASSENGER_TYPE].amount,
      }).map((__index) => {
        const currPassenger = passengerInformation.passengers.find(
          (pax) => pax.type === passengerType && pax.index === _pIndex
        );

        const passenger: IPassengerInformationFormValue["passengers"][0] =
          currPassenger
            ? currPassenger
            : {
                index: _pIndex,
                title:
                  (passengerType === PASSENGER_TYPE.CHILDREN &&
                    PASSENGER_TITLE.CHILDREN) ||
                  (passengerType === PASSENGER_TYPE.INFANT &&
                    PASSENGER_TITLE.INFANT) ||
                  PASSENGER_TITLE.MR,
                firstName: "",
                lastName: "",
                gender: GENDER.FEMALE,
                birthDate: undefined,
                isContact: __index === 0 && _index === 0,
                dependent: null,
                type: passengerType as PASSENGER_TYPE,
              };
        _pIndex = _pIndex + 1;
        initialPassengers.push(passenger);
      });
    });

    initialPassengers.sort((a, b) => a.index - b.index);

    const passengerInformationInitial = new PassengerInformationStore(
      initialPassengers,
      passengerInformation.title,
      passengerInformation.contactFirstName,
      passengerInformation.contactLastName,
      passengerInformation.contactPhone,
      passengerInformation.contactEmail
    );
    bookingInformationVar({
      ...bookingInformation,
      passengerInformation: passengerInformationInitial,
    });

    passengerInformationVar(passengerInformationInitial);
  };

  const onFinish = () => {
    const passengersBookingUpdate = passengerInfomationForm.passengers.reduce<
      PassengerBookingInformationType[]
    >((acc, passenger, _index) => {
      acc = [
        ...acc,
        {
          ...passenger,
          index: _index,
        },
      ];
      return acc;
    }, []);
    const bookingInformationUpdate: IFlightBookingInformation = {
      ...bookingInformation,
      passengerInformation: {
        contactEmail: passengerInfomationForm.contactEmail,
        contactFirstName: passengerInfomationForm.contactFirstName,
        contactGender: passengerInfomationForm.contactGender,
        contactLastName: passengerInfomationForm.contactLastName,
        contactPhone: passengerInfomationForm.contactPhone,
        title: passengerInfomationForm.title,
        passengers: passengersBookingUpdate,
      },
    };

    bookingInformationVar(bookingInformationUpdate);
  };

  return {
    onFinish,
    onAddPassengersInformation,
    onInitPassengerInformation,
    onAddContactInformation,
    passengerInformation: useReactiveVar(passengerInformationVar),
  };
};
export default usePassengerInformation;
