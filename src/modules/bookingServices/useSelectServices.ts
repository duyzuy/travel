import { ReactiveVar, useReactiveVar } from "@apollo/client";
import {
  FLIGHT_SERVICES,
  IBookingServices,
  ILuggageSelectedItem,
  ISeatSeledtedItem,
} from "./bookingServices.interface";

const useSelectServices = (
  selectedServiceVar: ReactiveVar<IBookingServices>
) => {
  const selectedServices = selectedServiceVar();

  const onAddLuggageItemsToFlightDeparture = (
    items: ILuggageSelectedItem[]
  ) => {
    const newSevices: IBookingServices = {
      ...selectedServices,
      luggages: {
        ...selectedServices.luggages,
        flightDepart: items,
      },
    };
    selectedServiceVar(newSevices);
  };

  const onAddLuggageItemsToFlightReturn = (items: ILuggageSelectedItem[]) => {
    const newSevices: IBookingServices = {
      ...selectedServices,
      luggages: {
        ...selectedServices.luggages,
        flightReturn: items,
      },
    };
    selectedServiceVar(newSevices);
  };
  const onInitLuggages = (luggages: IBookingServices["luggages"]) => {
    selectedServiceVar({ ...selectedServices, luggages });
  };

  const onAddSeatToFlightDeparture = (seats: ISeatSeledtedItem[]) => {
    selectedServiceVar({
      ...selectedServices,
      seats: { ...selectedServices.seats, flightDepart: seats },
    });
  };
  const onAddSeatToFlightReturn = (seats: ISeatSeledtedItem[]) => {
    selectedServiceVar({
      ...selectedServices,
      seats: { ...selectedServices.seats, flightReturn: seats },
    });
  };

  const onInitialServices = (
    serVice: FLIGHT_SERVICES,
    selectedItems: IBookingServices[FLIGHT_SERVICES]
  ) => {
    selectedServiceVar({ ...selectedServices, [serVice]: selectedItems });
  };
  return {
    onAddLuggageItemsToFlightDeparture,
    onAddLuggageItemsToFlightReturn,
    onAddSeatToFlightReturn,
    onAddSeatToFlightDeparture,
    onInitLuggages,
    onInitialServices,
    selectedServices: useReactiveVar(selectedServiceVar),
  };
};
export default useSelectServices;
