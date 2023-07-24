import { Brands, DepartTimes, FILTER_KEYS } from "@/cache/vars";

import { ReactiveVar } from "@apollo/client";
import { BRANDS, DEPARTURE_TIMES } from "@/cache/vars";

export const useFlightFilter = (
  flightFilterVar: ReactiveVar<{ brands: Brands; departTimes: DepartTimes }>
) => {
  const onFilterFlight = ({
    key,
    value,
  }: {
    key: FILTER_KEYS;
    value: BRANDS | DEPARTURE_TIMES;
  }) => {
    let filters = flightFilterVar();

    const indexItem = filters[key].indexOf(value);

    if (indexItem === -1) {
      filters = {
        ...filters,
        [key]: [...filters[key], value],
      };
    } else {
      let temp = filters[key];
      temp.splice(indexItem, 1);
      filters = {
        ...filters,
        [key]: [...temp],
      };
    }
    flightFilterVar(filters);
  };

  return onFilterFlight;
};
