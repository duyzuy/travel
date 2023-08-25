import { makeVar } from "@apollo/client";
import { PASSENGER_TYPE } from "@/constants/enum";
import { TRIP_TYPE } from "@/constants/enum";

import { SearchBookingFormValue } from "@/modules/bookingTicket/searchBookingForm.interface";

const searchFlightFormInit = new SearchBookingFormValue(
  TRIP_TYPE.ROUND_TRIP,
  undefined,
  undefined,
  undefined,
  undefined,
  {
    [PASSENGER_TYPE.ADULT]: { amount: 1 },
    [PASSENGER_TYPE.CHILDREN]: { amount: 0 },
    [PASSENGER_TYPE.INFANT]: { amount: 0 },
  }
);

export const flightSearchFormVar =
  makeVar<SearchBookingFormValue>(searchFlightFormInit);
