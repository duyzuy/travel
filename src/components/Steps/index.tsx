"use client";
import React, { memo } from "react";
import classNames from "classnames";
import Step from "./Step";
interface Props {
  steps: {
    index: number;
    num: number;
    text: string;
  }[];
  currentIndexs: number[];
}
const Steps = (props: Props) => {
  const { steps, currentIndexs } = props;
  return (
    <ul className="steps flex items-center gap-x-3 text-sm">
      {steps.map((step) => (
        <Step
          key={step.index}
          name={step.text}
          active={currentIndexs.includes(step.index)}
          num={step.num}
        />
      ))}
    </ul>
  );
};
export default memo(Steps);
