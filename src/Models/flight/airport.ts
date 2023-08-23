export interface IAirport {
  code: string;
  name: string;
  cityCode: string;
  cityName: string;
  timeZone: string;
}

export class Airport implements IAirport {
  code: string;
  name: string;
  cityCode: string;
  cityName: string;
  timeZone: string;

  constructor(
    code: string,
    name: string,
    cityCode: string,
    cityName: string,
    timeZone: string
  ) {
    this.name = name;
    this.cityCode = cityCode;
    this.timeZone = timeZone;
    this.cityName = cityName;
    this.code = code;
  }
}
