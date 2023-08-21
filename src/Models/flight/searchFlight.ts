import { TripType, PaxType } from "@/constants/enum";
import { IAirPort } from "../airport";

export interface ISearchDate {
  value: string;
  date: Date;
}

export interface ISearchFlightForm {
  tripType: TripType;
  tripFrom?: IAirPort;
  tripTo?: IAirPort;
  departDate?: ISearchDate;
  returnDate?: ISearchDate;
  passengers: Record<PaxType, { amount: number }>;
}

export const searchFlightFormInit: ISearchFlightForm = {
  tripType: TripType.ROUND_TRIP,
  returnDate: undefined,
  departDate: undefined,
  tripFrom: undefined,
  tripTo: undefined,
  passengers: {
    [PaxType.ADULT]: {
      amount: 1,
    },
    [PaxType.CHILDREN]: {
      amount: 0,
    },
    [PaxType.INFANT]: {
      amount: 0,
    },
  },
};
