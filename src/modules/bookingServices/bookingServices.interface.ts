import { ISeatOption } from "@/Models/seatMap";

export interface ILuggageOption {
  id: string;
  name: string;
  baseAmount: number;
  discountAmount: number;
  taxAmount: number;
}

export interface ILuggageSelectedItem {
  item: ILuggageOption;
  passenger: { index: number };
}
export interface ISeatSeledtedItem {
  passenger: { index: number };
  item: ISeatOption;
}

export enum FLIGHT_SERVICES {
  SEATS = "seats",
  INSURRANCE = "insurrance",
  LUGGAGES = "luggages",
  MEALS = "meals",
}
export interface IBookingServices {
  [FLIGHT_SERVICES.SEATS]: {
    flightDepart?: ISeatSeledtedItem[];
    flightReturn?: ISeatSeledtedItem[];
  };
  [FLIGHT_SERVICES.INSURRANCE]?: {};
  [FLIGHT_SERVICES.LUGGAGES]: {
    flightDepart?: ILuggageSelectedItem[];
    flightReturn?: ILuggageSelectedItem[];
  };
  [FLIGHT_SERVICES.MEALS]: { flightDepart?: []; flightReturn?: [] };
}
