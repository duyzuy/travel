"use client";

import React, { memo, useMemo } from "react";

import { useQuery } from "@apollo/client";
import { QUERY_SEAT_MAP_BY_MODEL } from "@/operations/queries/seatMap";
import { ISeatMapModel, ISeatOption } from "@/Models/seatMap";

import AirCraftModel from "@/components/Flights/AirCraftModel";
const SeatMapA330: React.FC = () => {
  const { data, loading, refetch, error } = useQuery<{
    seatMapModel: ISeatMapModel;
  }>(QUERY_SEAT_MAP_BY_MODEL, {
    variables: {
      model: "A330",
    },
  });

  const { seatMapModel } = data || {};
  const alphabetCellOfRow = ["A", "B", "C", "D", "F", "G", "H", "J", "K"];

  const seatMapRows = useMemo(() => {
    const initialRows: {
      rowNumber: number;
      rowSeats: (ISeatOption | null)[];
    }[] = [];
    let lastCellOfRow = "1";
    let cellOfRow = 0;
    let startOfRow = 0;

    if (!seatMapModel) {
      return [];
    }
    return seatMapModel.seatOptions.reduce((acc, curentSeat) => {
      if (acc.length === 0) {
        acc[startOfRow] = {
          rowNumber: Number(curentSeat.seatMapCell.rowIdentifier),
          rowSeats: [curentSeat],
        };
      } else {
        if (curentSeat.seatMapCell.rowIdentifier !== lastCellOfRow) {
          const nextRow = startOfRow + 1;

          /**
           *  Check prev-row is enought alphabet cells before change next row
           *  @if not engough fill the rest cells to row
           *
           */

          if (acc[startOfRow].rowSeats.length < alphabetCellOfRow.length) {
            let restOfCellRow = acc[startOfRow].rowSeats.length;
            while (restOfCellRow < alphabetCellOfRow.length) {
              acc[startOfRow] = {
                ...acc[startOfRow],
                rowSeats: [...acc[startOfRow].rowSeats, null],
              };
              restOfCellRow = restOfCellRow + 1;
            }
          }
          /**
           * Check first cell of row is matching the first alphabet
           * @if not append null
           * @then update next cell of row
           * @then update next row
           */

          if (curentSeat.seatMapCell.seatIdentifier !== alphabetCellOfRow[0]) {
            let nextCellRow = 0;
            while (nextCellRow < alphabetCellOfRow.length) {
              if (
                curentSeat.seatMapCell.seatIdentifier ===
                alphabetCellOfRow[nextCellRow]
              ) {
                break;
              }
              if (!acc[nextRow]) {
                acc[nextRow] = {
                  rowNumber: Number(curentSeat.seatMapCell.rowIdentifier),
                  rowSeats: [null],
                };
              } else {
                acc[nextRow] = {
                  rowNumber: Number(curentSeat.seatMapCell.rowIdentifier),
                  rowSeats: [...acc[nextRow].rowSeats, null],
                };
              }

              nextCellRow = nextCellRow + 1;
            }
            acc[nextRow] = {
              ...acc[nextRow],
              rowSeats: [...acc[nextRow].rowSeats, curentSeat],
            };
            cellOfRow = nextCellRow;
          } else {
            acc[nextRow] = {
              rowNumber: Number(curentSeat.seatMapCell.rowIdentifier),
              rowSeats: [curentSeat],
            };
            cellOfRow = 0;
          }

          startOfRow = nextRow;
        } else {
          let nextCellRow = cellOfRow + 1;

          if (
            curentSeat.seatMapCell.seatIdentifier !==
            alphabetCellOfRow[nextCellRow]
          ) {
            while (nextCellRow < alphabetCellOfRow.length) {
              if (
                curentSeat.seatMapCell.seatIdentifier ===
                alphabetCellOfRow[nextCellRow]
              ) {
                break;
              }

              acc[startOfRow] = {
                ...acc[startOfRow],
                rowSeats: [...acc[startOfRow].rowSeats, null],
              };

              nextCellRow = nextCellRow + 1;
            }
            acc[startOfRow] = {
              ...acc[startOfRow],
              rowSeats: [...acc[startOfRow].rowSeats, curentSeat],
            };
          } else {
            acc[startOfRow] = {
              ...acc[startOfRow],
              rowSeats: [...acc[startOfRow].rowSeats, curentSeat],
            };
          }
          cellOfRow = nextCellRow;
        }
      }
      lastCellOfRow = curentSeat.seatMapCell.rowIdentifier;
      return acc;
    }, initialRows);
  }, [seatMapModel]);

  if (loading) return <>...loading</>;
  if (error) return `Error! ${error.message}`;
  if (!data) return <>undefined</>;
  return (
    <AirCraftModel
      modelName="A330"
      rowsSeats={seatMapRows}
      rowsHead={alphabetCellOfRow}
      rowsEmergency={[14, 33]}
      rowsWings={10}
      rowsSpacing={[2, 8, 14, 33]}
      onSelect={() => {}}
    />
  );
};
export default memo(SeatMapA330);
