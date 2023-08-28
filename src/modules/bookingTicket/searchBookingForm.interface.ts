import { TRIP_TYPE, PASSENGER_TYPE } from "@/constants/enum";
import { IAirPort } from "@/Models/airport";

export interface ISearchDate {
  value: string;
  date: Date;
}

export interface ISearchBookingFormValue {
  tripType: TRIP_TYPE;
  tripFrom?: IAirPort;
  tripTo?: IAirPort;
  departDate?: ISearchDate;
  returnDate?: ISearchDate;
  passengers: Record<PASSENGER_TYPE, { amount: number }>;
}

export class SearchBookingFormValue implements ISearchBookingFormValue {
  tripType: TRIP_TYPE;
  tripFrom?: IAirPort;
  tripTo?: IAirPort;
  departDate?: ISearchDate;
  returnDate?: ISearchDate;
  passengers: Record<PASSENGER_TYPE, { amount: number }>;

  constructor(
    tripType: TRIP_TYPE,
    tripFrom: IAirPort | undefined,
    tripTo: IAirPort | undefined,
    departDate: ISearchDate | undefined,
    returnDate: ISearchDate | undefined,
    passengers: Record<PASSENGER_TYPE, { amount: number }>
  ) {
    this.tripFrom = tripFrom;
    this.tripTo = tripTo;
    this.tripType = tripType;
    this.departDate = departDate;
    this.returnDate = returnDate;
    this.passengers = passengers;
  }
}
