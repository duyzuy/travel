export interface IAirline {
  id: number;
  code: string;
  name: string;
  logo: string;
}

export class Airline implements IAirline {
  id: number;
  code: string;
  name: string;
  logo: string;
  constructor(id: number, code: string, name: string, logo: string) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.logo = logo;
  }
}
