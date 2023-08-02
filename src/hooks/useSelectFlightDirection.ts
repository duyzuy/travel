import { DirectSelectionType } from "@/cache/type/booking";
import { Direction } from "@/constants/enum";
import { ReactiveVar } from "@apollo/client";

export const useSelectFlightDirection = (
  flightDirectionSelectVar: ReactiveVar<DirectSelectionType>
) => {
  const onSetSelection = (direction: Direction) => {
    const currentStack = flightDirectionSelectVar();

    if (currentStack.selecting !== direction) {
      flightDirectionSelectVar({ selecting: direction });
    }
  };
  return onSetSelection;
};
