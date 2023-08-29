import { IAirline } from "@/Models/flight/airline";
import { makeVar } from "@apollo/client";

export const airlinesVar = makeVar<IAirline[]>([]);
