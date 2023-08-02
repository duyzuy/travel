import { useState, useEffect, useCallback } from "react";
const useWindowScroll = (
  elementRef?: React.RefObject<HTMLDivElement | null>
) => {
  const [element, setElement] = useState({
    top: 0,
    left: 0,
    right: 0,
    height: 0,
    width: 0,
  });
  const [scrollLing, setScrolling] = useState<{
    direction: "up" | "down" | null;
    scrollY: number;
  }>({
    direction: null,
    scrollY: 0,
  });

  useEffect(() => {
    if (elementRef && elementRef?.current !== null) {
      const el = elementRef.current;

      setElement({
        width: el.getBoundingClientRect().width,
        height: el.getBoundingClientRect().height,
        top: el.getBoundingClientRect().top,
        left: el.getBoundingClientRect().left,
        right: el.getBoundingClientRect().right,
      });
    }

    let tempScroll = 0;
    const handleScrollEvent = () => {
      const windowScrollY = window.scrollY;
      let direction: "up" | "down" | null = null;
      if (windowScrollY > tempScroll) {
        direction = "down";
      } else {
        direction = "up";
      }
      tempScroll = windowScrollY;

      setScrolling({
        direction,
        scrollY: windowScrollY,
      });
    };

    window.addEventListener("scroll", handleScrollEvent);

    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return {
    scrollLing,
    element,
  };
};
export default useWindowScroll;
