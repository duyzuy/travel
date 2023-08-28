"use client";

import { useEffect, useState } from "react";

const useDeviceDetect = () => {
  const [device, setDevice] = useState({
    isDesktop: true,
    isMobile: false,
    isTablet: false,
  });

  useEffect(() => {
    const handleResizeScreen = () => {
      if (window.innerWidth > 1200) {
        if (device.isDesktop) return;

        setDevice(() => ({
          isDesktop: true,
          isTablet: false,
          isMobile: false,
        }));
      } else if (window.innerWidth < 1200 && window.innerWidth > 768) {
        if (device.isTablet) return;

        setDevice(() => ({
          isDesktop: false,
          isTablet: true,
          isMobile: false,
        }));
      } else if (window.innerWidth < 768) {
        if (device.isMobile) return;

        setDevice(() => ({
          isDesktop: false,
          isTablet: false,
          isMobile: true,
        }));
      }
    };

    window.addEventListener("resize", handleResizeScreen);

    return () => window.removeEventListener("resize", handleResizeScreen);
  }, [device]);

  return device;
};
export default useDeviceDetect;
