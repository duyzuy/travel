import { memo } from "react";
import Button from "../base/Button";
import { IconRoundTrip, IconOneWay } from "../Icons";

import { TripType } from "@/constants/enum";

interface ISearchFlightInformation {
  onEditSearch: () => void;
  isEditting: boolean;
  departureCityName: string;
  departureCode: string;
  arrivalCityName: string;
  arrivalCode: string;
  tripType: TripType;
  departDate: string;
  returnDate: string;
  adultAmount: number;
  childrentAmount: number;
  infantAmount: number;
}
const SearchFlightInformation: React.FC<ISearchFlightInformation> = ({
  arrivalCode,
  arrivalCityName,
  isEditting,
  onEditSearch,
  tripType,
  departureCityName,
  departureCode,
  departDate,
  returnDate,
  adultAmount,
  childrentAmount,
  infantAmount,
}) => {
  return (
    <div className="summary-booking-infor flex items-center flex-1">
      <div className="mr-12">
        <p className="round-trip flex items-center">
          <span className="depart-name font-bold">
            <span className="city mr-1 uppercase">{departureCityName}</span>
            <span className="code text-sm text-gray-500">
              {`(${departureCode})`}
            </span>
          </span>

          <span className="trip-type mx-2">
            {(tripType === TripType.ROUND_TRIP && <IconRoundTrip />) || (
              <IconOneWay />
            )}
          </span>
          <span className="arrival-name font-bold">
            <span className="city mr-1 uppercase">{arrivalCityName}</span>
            <span className="code text-sm text-gray-500">{`(${arrivalCode})`}</span>
          </span>
        </p>
        <p className="trip-info text-sm text-gray-500">
          <span>
            {(tripType === TripType.ROUND_TRIP && "Khứ hồi") || "Một chiều"}
          </span>
          <span className="mx-2 text-xs">|</span>
          <span className="">
            <span className="depart-date">
              {departDate}
              {tripType === TripType.ROUND_TRIP ? (
                <>
                  <span className="mx-1">-</span>
                  <span className="return-date">{returnDate}</span>
                </>
              ) : null}
            </span>
          </span>
          <span className="mx-2 text-xs">|</span>

          <span className="passengers">
            <span className="pax-adult">{adultAmount} người lớn</span>
            {childrentAmount > 0 ? (
              <span className="pax-children">{`, ${childrentAmount} trẻ em`}</span>
            ) : null}
            {infantAmount > 0 ? (
              <span className="pax-children">{`, ${infantAmount} em bé`}</span>
            ) : null}
          </span>
        </p>
      </div>
      <div className="">
        <Button
          color={isEditting ? "danger" : "secondary"}
          variant="outline"
          size="sm"
          rounded="sm"
          className="text-xs shadow-md"
          onClick={onEditSearch}
        >
          {isEditting ? "Huỷ bỏ" : "Chỉnh sửa"}
        </Button>
      </div>
    </div>
  );
};
export default memo(SearchFlightInformation);
