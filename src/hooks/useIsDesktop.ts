import useDeviceType from "./useDeviceType";

export const useIsDesktop = () => {
  return useDeviceType(1024, 10000);
};
