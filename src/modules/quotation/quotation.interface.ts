export interface ITicketCharge {
  adult: {
    name: string;
    quantity: number;
    farePriceAdult: number;
    priceAdultUnit: number;
    priceAdults: number;
  };
  children: {
    name: string;
    quantity: number;
    priceChildUnit: number;
    priceChildren: number;
    farePriceChild: number;
  };
  infant: {
    name: string;
    quantity: number;
    priceInfantUnit: number;
    priceInfants: number;
  };
  grandTotal: number;
}
export interface ISeatCharge {
  name: string;
  key: string;
  baseAmount: number;
  taxAmount: number;
  totalAmount: number;
}
export interface ILuggageCharge {
  name: string;
  key: string;
  baseAmount: number;
  taxAmount: number;
  totalAmount: number;
}
export interface IQuotation {
  flightDeparture: {
    ticket: ITicketCharge;
    service: {
      seat: ISeatCharge[];
      luggage: ILuggageCharge[];
    };
  };
  flightReturn?: {};
}
