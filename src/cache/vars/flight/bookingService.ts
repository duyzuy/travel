import {
  FLIGHT_SERVICES,
  IBookingServices,
} from "@/modules/bookingServices/bookingServices.interface";
import { makeVar } from "@apollo/client";
export const showModalLuggageVar = makeVar<boolean>(false);
export const flightItemTicketModalVar = makeVar<boolean>(false);
export const selectingServicesVar = makeVar<IBookingServices>({
  [FLIGHT_SERVICES.SEATS]: {},
  [FLIGHT_SERVICES.LUGGAGES]: {},
  [FLIGHT_SERVICES.MEALS]: {},
  [FLIGHT_SERVICES.INSURRANCE]: undefined,
});
