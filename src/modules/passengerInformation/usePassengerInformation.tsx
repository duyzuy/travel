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
  const onInitPassengers = () => {
    let passengerBookingInfo = bookingInformation.passengerInformation;
    const person = bookingInformation.bookingInfo.passengers;

    if (!person) {
      return;
    }
    let passengersStore: PassengerInformationStore["passengers"] = [];

    //init passengers
    Object.keys(person).forEach((passengerType, _index) => {
      const currPassenger = passengerBookingInfo.passengers?.find(
        (pax) => pax.type === passengerType && pax.index === _index
      );

      Array.from({
        length: person[passengerType as PASSENGER_TYPE].amount,
      }).map((_pIndex) => {
        const passenger: PassengerInformationStore["passengers"][0] =
          currPassenger || {
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
            isContact: _pIndex === 0 && _index === 0,
            dependent: "",
            type: passengerType as PASSENGER_TYPE,
          };

        passengersStore.push(passenger);
      });
    });

    passengerBookingInfo = {
      ...passengerBookingInfo,
      contactEmail: passengerBookingInfo.contactEmail || "",
      contactFirstName: passengerBookingInfo.contactFirstName || "",
      contactGender: passengerBookingInfo.contactGender || "",
      contactPhone: passengerBookingInfo.contactPhone || "",
      contactLastName: passengerBookingInfo.contactLastName || "",
      passengers: passengersStore.reduce(
        (
          sum: IFlightBookingInformation["passengerInformation"]["passengers"],
          passenger: PassengerInformationStore["passengers"][0],
          index
        ) => {
          sum = [...sum, { ...passenger, index: index }];
          return sum;
        },
        []
      ),
    };

    const passengerFormValue = new PassengerInformationStore(
      passengersStore,
      PASSENGER_TITLE.MR,
      "",
      "",
      "",
      ""
    );
    bookingInformationVar({
      ...bookingInformation,
      passengerInformation: passengerBookingInfo,
    });

    passengerInformationVar(passengerFormValue);
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
    onInitPassengers,
    onAddContactInformation,
    passengerInformation: useReactiveVar(passengerInformationVar),
  };
};
export default usePassengerInformation;
