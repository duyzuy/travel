export enum TripType {
  ONEWAY = "oneWay",
  ROUND_TRIP = "roundTrip",
}
export enum TripDestination {
  TRIP_FROM = "tripFrom",
  TRIP_TO = "tripTo",
}
export enum TripDate {
  DATE_FROM = "dateFrom",
  DATE_TO = "dateTo",
}
export enum PaxType {
  ADULT = "adult",
  CHILDREN = "children",
  INFANT = "infant",
}
import { IAirPort } from "./airport";
import { FlightDetailItemType } from "./ticket";
export type BookingDateType = {
  value: string | null;
  date: Date | null;
};
export interface IBookingType {
  tripType: TripType;
  returnDate: BookingDateType;
  departDate: BookingDateType;
  tripFrom: IAirPort | null;
  tripTo: IAirPort | null;
  passengers: {
    [PaxType.ADULT]: {
      amount: number;
      paxType: PaxType.ADULT;
    };
    [PaxType.CHILDREN]: {
      amount: number;
      paxType: PaxType.CHILDREN;
    };
    [PaxType.INFANT]: {
      amount: number;
      paxType: PaxType.INFANT;
    };
  };
  flightItems: {
    outbound: { tid: number; detail: FlightDetailItemType } | null;
    inbound: { tid: number; detail: FlightDetailItemType } | null;
  };
  passengersInfo: {};
}

export const bookingInitialState: IBookingType = {
  tripType: TripType.ROUND_TRIP,
  returnDate: {
    value: null,
    date: null,
  },
  departDate: {
    value: null,
    date: null,
  },
  tripFrom: null,
  tripTo: null,
  passengers: {
    [PaxType.ADULT]: {
      amount: 1,
      paxType: PaxType.ADULT,
    },
    [PaxType.CHILDREN]: {
      amount: 0,
      paxType: PaxType.CHILDREN,
    },
    [PaxType.INFANT]: {
      amount: 0,
      paxType: PaxType.INFANT,
    },
  },
  flightItems: {
    outbound: null,
    inbound: null,
  },
  passengersInfo: {},
};
export type PassengersType = typeof bookingInitialState.passengers;
