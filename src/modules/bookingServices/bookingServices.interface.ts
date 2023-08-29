import { ISeatOption } from "@/Models/seatMap";
import { ILuggage } from "@/Models/flight/luggage";
import { IMealOption } from "@/Models/flight/meal";
export interface ILuggageSelectedItem {
  item: ILuggage;
  passenger: { index: number };
}
export interface ISeatSeledtedItem {
  passenger: { index: number };
  item: ISeatOption;
}

type MealSelectedOptionType = IMealOption & { quantity: number };
export interface IMealSelectedItem {
  passenger: { index: number };
  items: MealSelectedOptionType[];
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
  [FLIGHT_SERVICES.MEALS]: {
    flightDepart?: IMealSelectedItem[];
    flightReturn?: IMealSelectedItem[];
  };
}
