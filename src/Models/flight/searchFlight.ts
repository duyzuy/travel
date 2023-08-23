import { TRIP_TYPE, PAX_TYPE } from "@/constants/enum";
import { IAirPort } from "../airport";

export interface ISearchDate {
  value: string;
  date: Date;
}

export interface ISearchFlightForm {
  tripType: TRIP_TYPE;
  tripFrom?: IAirPort;
  tripTo?: IAirPort;
  departDate?: ISearchDate;
  returnDate?: ISearchDate;
  passengers: Record<PAX_TYPE, { amount: number }>;
}

export const searchFlightFormInit: ISearchFlightForm = {
  tripType: TRIP_TYPE.ROUND_TRIP,
  returnDate: undefined,
  departDate: undefined,
  tripFrom: undefined,
  tripTo: undefined,
  passengers: {
    [PAX_TYPE.ADULT]: {
      amount: 1,
    },
    [PAX_TYPE.CHILDREN]: {
      amount: 0,
    },
    [PAX_TYPE.INFANT]: {
      amount: 0,
    },
  },
};
