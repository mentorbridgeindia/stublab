import useDeviceType from "./useDeviceType";

export const useIsMobile = () => {
  return useDeviceType(370, 768);
};
