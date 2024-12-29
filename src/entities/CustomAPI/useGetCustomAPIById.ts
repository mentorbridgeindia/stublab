import { IQueryConfig } from "@/api/types";
import { STALE_TIME_FOR_NOT_URGENT_UPDATES } from "@api/constants";
import { CUSTOM_APIS_ENDPOINT } from "@api/endpoints";
import { fetchData } from "@api/Get/fetchData";
import { useQuery } from "@tanstack/react-query";
import { ICustomAPIEntity } from "./CustomAPI.types";

const ENTITY_TYPE = "application";

const getCustomAPIById = async (id: string) => {
  return await fetchData<ICustomAPIEntity>(`${CUSTOM_APIS_ENDPOINT}/${id}`);
};

export const useGetCustomAPIById = (id: string, queryConfig: IQueryConfig) =>
  useQuery<ICustomAPIEntity>({
    queryKey: [ENTITY_TYPE],
    queryFn: () => getCustomAPIById(id),
    staleTime: STALE_TIME_FOR_NOT_URGENT_UPDATES,
    ...queryConfig,
  });
