export interface IAirPort {
  id: string;
  code: string;
  airportGroupId: string;
  engName: string;
  name: string;
  province: {
    provinceCode: string;
    provinceName: string;
    provinceEngName: string;
    country: {
      id: string;
      status: "Active" | "Deactive";
      countryCode: string;
      countryName: string;
      countryEngName: string;
    };
  };
}

export type AirPortList = IAirPort[];
