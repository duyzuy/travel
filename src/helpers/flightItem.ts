import { IAirPort } from "@/Models/airport";
import { Airline } from "@/Models/flight/airline";
export const durationToString = (durationTime: number) => {
  const hour = Math.floor(durationTime / (60 * 60 * 1000));

  const minute = Math.floor((durationTime / (60 * 1000)) % 60);

  return `${hour}h ${minute}m`;
};

export const getProvinceName = (airtport?: IAirPort) => {
  if (airtport) {
    return `${airtport.province.provinceName} (${airtport.code})`;
  }
  return "--";
};

export const getOperationFromFlightNumber = (
  airlines: Airline[],
  flightNumber: string
) => {
  return airlines.find((airline) => flightNumber.includes(airline.code));
};
