import { Brands, DepartTimes, FILTER_KEYS, SHORTINGS } from "@/cache/vars";

import { ReactiveVar } from "@apollo/client";
import { BRANDS, DEPARTURE_TIMES } from "@/cache/vars";

export const useFlightFilter = (
  flightFilterVar: ReactiveVar<{
    [FILTER_KEYS.BRAND]: Brands;
    [FILTER_KEYS.DEPARTIME]: DepartTimes;
    [FILTER_KEYS.SORTING]: SHORTINGS;
  }>
) => {
  const onFilterFlight = ({
    key,
    value,
  }: {
    key: FILTER_KEYS;
    value: BRANDS | DEPARTURE_TIMES | SHORTINGS;
  }) => {
    let filters = flightFilterVar();

    if (key !== FILTER_KEYS.SORTING) {
      const filterItems = filters[key];
      if (filterItems !== null) {
        const indexItem = filterItems.indexOf(value);

        if (indexItem === -1) {
          filters = {
            ...filters,
            [key]: [...filterItems, value],
          };
        } else {
          let temp = filterItems;
          temp.splice(indexItem, 1);
          filters = {
            ...filters,
            [key]: [...temp],
          };
        }
      } else {
        filters = {
          ...filters,
          [key]: [value],
        };
      }
    } else {
      filters = {
        ...filters,
        [FILTER_KEYS.SORTING]: value as SHORTINGS,
      };
    }
    flightFilterVar(filters);
  };

  return onFilterFlight;
};
