import { ISearchFlightForm, IAirPort } from "@/Models";
import { ReactiveVar, useReactiveVar } from "@apollo/client";
import { TripDate, TripDestination, TripType } from "@/constants/enum";
export const useSearchFormFlight = (
  searchFlightVar: ReactiveVar<ISearchFlightForm>
) => {
  const searchInformation = searchFlightVar();
  const onChangeTripType = (tripType: TripType) => {
    searchFlightVar({
      ...searchInformation,
      tripType,
    });
  };

  const onSelectTripDestination = (
    destination: TripDestination,
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
    tripDate?: TripDate,
    data?: { date: Date; dateStr: string }
  ) => {
    let newSearchInfo = { ...searchInformation };

    if (action === "update") {
      if (data && tripDate === TripDate.DATE_FROM) {
        newSearchInfo = {
          ...searchInformation,
          departDate: { value: data.dateStr, date: data.date },
        };
      }

      if (!data && tripDate === TripDate.DATE_FROM) {
        newSearchInfo = {
          ...searchInformation,
          departDate: undefined,
        };
      }

      if (data && tripDate === TripDate.DATE_TO) {
        newSearchInfo = {
          ...searchInformation,
          returnDate: { value: data.dateStr, date: data.date },
        };
      }

      if (!data && tripDate === TripDate.DATE_TO) {
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
