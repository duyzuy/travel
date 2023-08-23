export interface IFrareType {
  name: string | null;
}

export class FareType implements IFrareType {
  name: string | null;

  constructor(name: string | null) {
    this.name = name;
  }
}
