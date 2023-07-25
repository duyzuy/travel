"use client";

import React, { useEffect, useState, memo, useRef } from "react";

const CollapseContent: React.FC<{
  children: React.ReactNode;
  isOpen: boolean;
}> = ({ children, isOpen }) => {
  const [isShow, setIsShow] = useState(isOpen);
  const [height, setHeight] = useState(0);

  const TIME_OUT = 240;

  const collapseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsShow(isOpen);
    } else {
      setTimeout(() => {
        setIsShow(isOpen);
      }, TIME_OUT);
    }
  }, [isOpen]);

  useEffect(() => {
    if (collapseRef.current === null) {
      setHeight(0);
    } else {
      if (isOpen) {
        setHeight(collapseRef.current.scrollHeight);
      } else {
        setHeight(0);
      }
    }
  }, [isOpen, isShow]);

  if (!isShow) {
    return null;
  }

  return (
    <div
      className="custom-collapse bg-white"
      ref={collapseRef}
      style={{
        height: height,
        transition: `height ease ${TIME_OUT}ms`,
        transformOrigin: "top center",
      }}
    >
      {children}
    </div>
  );
};
export default memo(CollapseContent);
