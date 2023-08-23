import { ISearchFlightForm, IAirPort } from "@/Models";
import { ReactiveVar, useReactiveVar } from "@apollo/client";
import { TRIP_DATE, TRIP_DESTINATION, TRIP_TYPE } from "@/constants/enum";
export const useSearchFormFlight = (
  searchFlightVar: ReactiveVar<ISearchFlightForm>
) => {
  const searchInformation = searchFlightVar();
  const onChangeTripType = (tripType: TRIP_TYPE) => {
    searchFlightVar({
      ...searchInformation,
      tripType,
    });
  };

  const onSelectTripDestination = (
    destination: TRIP_DESTINATION,
    airport: IAirPort
  ) => {
    searchFlightVar({
      ...searchInformation,
      [destination]: airport,
    });
  };
  const onSwapDestination = () => {
    if (!searchInfo.tripFrom || !searchInfo.tripTo) return;

    const temp = searchInfo.tripFrom;

    searchFlightVar({
      ...searchInformation,
      tripFrom: searchInfo.tripTo,
      tripTo: temp,
    });
  };

  const onSelectTripDate = (
    action: "update" | "reset",
    tripDate?: TRIP_DATE,
    data?: { date: Date; dateStr: string }
  ) => {
    let newSearchInfo = { ...searchInformation };

    if (action === "update") {
      if (data && tripDate === TRIP_DATE.DATE_FROM) {
        newSearchInfo = {
          ...searchInformation,
          departDate: { value: data.dateStr, date: data.date },
        };
      }

      if (!data && tripDate === TRIP_DATE.DATE_FROM) {
        newSearchInfo = {
          ...searchInformation,
          departDate: undefined,
        };
      }

      if (data && tripDate === TRIP_DATE.DATE_TO) {
        newSearchInfo = {
          ...searchInformation,
          returnDate: { value: data.dateStr, date: data.date },
        };
      }

      if (!data && tripDate === TRIP_DATE.DATE_TO) {
        newSearchInfo = {
          ...searchInformation,
          returnDate: undefined,
        };
      }
    }

    if (action === "reset") {
      newSearchInfo = {
        ...searchInformation,
        departDate: undefined,
        returnDate: undefined,
      };
    }

    searchFlightVar(newSearchInfo);
  };

  const onSelectPassenger = (passengers: ISearchFlightForm["passengers"]) => {
    const searchInform = searchFlightVar();
    searchFlightVar({
      ...searchInform,
      passengers: { ...passengers },
    });
  };

  const searchInfo = useReactiveVar(searchFlightVar);
  return {
    onChangeTripType,
    onSelectTripDestination,
    onSwapDestination,
    onSelectTripDate,
    onSelectPassenger,
    searchInfo,
  };
};
