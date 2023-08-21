import { Brands, DepartTimes, FILTER_KEYS, SORTS_ENUM } from "@/cache/vars";
import { ReactiveVar, useReactiveVar } from "@apollo/client";
import { BRANDS, DEPARTURE_TIMES } from "@/cache/vars";

export const useFilterFlightTicket = (
  flightFilterVar: ReactiveVar<{
    [FILTER_KEYS.BRAND]: Brands;
    [FILTER_KEYS.DEPARTIME]: DepartTimes;
    [FILTER_KEYS.SORTING]: SORTS_ENUM;
  }>
) => {
  let filters = flightFilterVar();

  const onFilterFlightTicket = ({
    key,
    value,
  }: {
    key: FILTER_KEYS.BRAND | FILTER_KEYS.DEPARTIME;
    value: BRANDS | DEPARTURE_TIMES;
  }) => {
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

    flightFilterVar(filters);
  };
  const onSortFlightTicket = (value: SORTS_ENUM) => {
    filters = {
      ...filters,
      [FILTER_KEYS.SORTING]: value,
    };

    flightFilterVar(filters);
  };
  const filter = useReactiveVar(flightFilterVar);
  return {
    onFilterFlightTicket,
    onSortFlightTicket,
    filter: filter,
  };
};
