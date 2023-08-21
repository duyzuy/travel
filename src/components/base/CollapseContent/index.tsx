"use client";

import React, { memo, useRef } from "react";

const CollapseContent: React.FC<{
  children: React.ReactNode;
  isOpen: boolean;
}> = ({ children, isOpen }) => {
  const collapseRef = useRef<HTMLDivElement>(null);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="custom-collapse bg-white" ref={collapseRef}>
      {children}
    </div>
  );
};
export default memo(CollapseContent);
