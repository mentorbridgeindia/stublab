import { useState, useEffect } from "react";

const useDeviceType = (minWidth: number, maxWidth: number) => {
  const [isDeviceWide, setIsDeviceWide] = useState(false);

  const checkDeviceWidth = () => {
    if (window.innerWidth >= minWidth && window.innerWidth <= maxWidth) {
      setIsDeviceWide(true);
    } else {
      setIsDeviceWide(false);
    }
  };

  useEffect(() => {
    checkDeviceWidth();

    const handleResize = () => {
      checkDeviceWidth();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minWidth]);

  return isDeviceWide;
};

export default useDeviceType;
