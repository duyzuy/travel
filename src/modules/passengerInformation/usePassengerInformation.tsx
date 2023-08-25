import { ReactiveVar, useReactiveVar } from "@apollo/client";
import { IPassengerInformationFormValue } from "./passengerInformation.interface";
import { bookingInformationVar } from "@/cache/vars";
import { IFlightBookingInformation } from "../bookingTicket/bookingInformation.interface";
import { PassengerInformationBookingType } from "../bookingTicket/bookingInformation.interface";
const usePassengerInformation = (
  passengerInformationVar: ReactiveVar<IPassengerInformationFormValue>
) => {
  const passengerInfo = passengerInformationVar();

  const passengerInformationUpdate = useReactiveVar(passengerInformationVar);

  const bookingInformation = useReactiveVar(bookingInformationVar);

  const onAddPassengersInformation = (
    passengers: IPassengerInformationFormValue["passengers"]
  ) => {
    const passengerInformationUpdate = {
      ...passengerInfo,
      passengers: passengers,
    };

    const passengersBookingUpdate = passengers.reduce<
      PassengerInformationBookingType[]
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
      passengers: passengersBookingUpdate,
    };

    bookingInformationVar(bookingInformationUpdate);
    passengerInformationVar(passengerInformationUpdate);
  };

  const onAddContactInformation = (
    contactInfo: Omit<IPassengerInformationFormValue, "passengers">
  ) => {
    const passengerInformationUpdate = {
      ...passengerInfo,
      ...contactInfo,
    };
    passengerInformationVar(passengerInformationUpdate);
  };
  const onInitPassengers = (
    data?: IPassengerInformationFormValue["passengers"]
  ) => {
    console.log("render");
    passengerInformationVar();
  };

  return {
    onAddPassengersInformation,
    onInitPassengers,
    onAddContactInformation,
    passengerInformation: passengerInformationUpdate,
  };
};
export default usePassengerInformation;
