import { IQueryConfig } from "@/api/types";
import { STALE_TIME_FOR_NOT_URGENT_UPDATES } from "@api/constants";
import { CUSTOM_APIS_ENDPOINT } from "@api/endpoints";
import { fetchData } from "@api/Get/fetchData";
import { useQuery } from "@tanstack/react-query";
import { ICustomAPIEntity } from "./CustomAPI.types";

const ENTITY_TYPE = "customAPI";

const getCustomAPIs = async () => {
  return await fetchData<ICustomAPIEntity>(CUSTOM_APIS_ENDPOINT);
};

export const useGetCustomAPIs = ({ queryConfig }: IQueryConfig = {}) =>
  useQuery<ICustomAPIEntity>({
    queryKey: [ENTITY_TYPE],
    queryFn: getCustomAPIs,
    staleTime: STALE_TIME_FOR_NOT_URGENT_UPDATES,
    ...queryConfig,
  });
