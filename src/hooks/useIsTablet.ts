import useDeviceType from "./useDeviceType";

export const useIsTablet = () => {
  return useDeviceType(768, 1024);
};
