"use client";

import React, { Fragment, memo, useMemo } from "react";

import { useQuery } from "@apollo/client";
import { QUERY_SEAT_MAP_BY_MODEL } from "@/operations/queries/seatMap";
import { ISeatMapModel, SeatOptionType } from "@/Models/seatMap";

import AirCraftModel from "../AirCraftModel";
const SeatMapA321: React.FC = () => {
  const { data, loading, refetch, error } = useQuery<{
    seatMapModel: ISeatMapModel;
  }>(QUERY_SEAT_MAP_BY_MODEL, {
    variables: {
      model: "A321",
    },
  });

  if (loading) return <>...loading</>;
  if (error) return `Error! ${error.message}`;
  if (!data) return <>undefined</>;

  const { seatMapModel } = data;
  const alphabetCellOfRow = ["A", "B", "C", "D", "E", "F"];

  const seatMapRows = useMemo(() => {
    const initialRows: {
      rowNumber: number;
      rowSeats: (SeatOptionType | null)[];
    }[] = [];
    let lastCellOfRow = "1";
    let cellOfRow = 0;
    let startOfRow = 0;

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
  const handleSelectSeat = (data: any) => {
    console.log(data);
  };
  return (
    <AirCraftModel
      modelName="A321"
      rowsWings={10}
      rowsEmergency={[10, 26]}
      rowsSpacing={[10, 26]}
      rowsHead={alphabetCellOfRow}
      rowsSeats={seatMapRows}
      onSelectSeat={handleSelectSeat}
    />
  );
};
export default memo(SeatMapA321);
