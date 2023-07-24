"use client";
import { CSSProperties, useEffect, useState } from "react";

export const AnimatedComponentMount = ({
  unMountStyle,
  mountStyle,
}: {
  unMountStyle: CSSProperties;
  mountStyle: CSSProperties;
}) => {
  return (comp: React.ElementType | JSX.ElementType) => {
    const [customStyle, setCustomStyle] = useState({ ...unMountStyle });

    let Component = comp;
    useEffect(() => {
      setCustomStyle(mountStyle);

      return () => setCustomStyle(unMountStyle);
    }, []);

    return (
      <div style={{ ...customStyle }}>
        <Component />
      </div>
    );
  };
};
