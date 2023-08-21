import { makeVar } from "@apollo/client";
import { ISearchFlightForm, searchFlightFormInit } from "@/Models";

export const flightSearchFormVar =
  makeVar<ISearchFlightForm>(searchFlightFormInit);
