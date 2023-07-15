export enum TripType {
  ONEWAY = "oneWay",
  ROUND_TRIP = "roundTrip",
}
export interface IBookingType {
  tripType: TripType;
  returnDate: {
    value: string | null;
    date: Date | null;
    format: string;
  };
  departDate: {
    value: string | null;
    date: Date | null;
    format: string;
  };
  tripFrom: {
    cityName: string;
    airportName: string;
    airportCode: string;
  };
  tripTo: {
    cityName: string;
    airportName: string;
    airportCode: string;
  };
  passengers: { paxType: "adult" | "children" | "infant"; amount: number }[];
}

export const bookingInitialState: IBookingType = {
  tripType: TripType.ONEWAY,
  returnDate: {
    value: null,
    date: null,
    format: "",
  },
  departDate: {
    value: null,
    date: null,
    format: "",
  },
  tripFrom: {
    cityName: "",
    airportName: "",
    airportCode: "",
  },
  tripTo: {
    cityName: "",
    airportName: "",
    airportCode: "",
  },
  passengers: [
    { paxType: "adult", amount: 1 },
    { paxType: "children", amount: 0 },
    { paxType: "infant", amount: 0 },
  ],
};
