import { IQueryConfig } from "@/api/types";
import { STALE_TIME_FOR_NOT_URGENT_UPDATES } from "@api/constants";
import { APPLICATIONS_ENDPOINT } from "@api/endpoints";
import { fetchData } from "@api/Get/fetchData";
import { useQuery } from "@tanstack/react-query";
import { IApplicationEntity } from "./Application.types";

const ENTITY_TYPE = "application";

const getApplicationById = async (id: string) => {
  return await fetchData<IApplicationEntity>(`${APPLICATIONS_ENDPOINT}/${id}`);
};

export const useGetApplicationById = (id: string, options?: IQueryConfig) =>
  useQuery<IApplicationEntity>({
    queryKey: [ENTITY_TYPE, id],
    queryFn: () => getApplicationById(id),
    staleTime: STALE_TIME_FOR_NOT_URGENT_UPDATES,
    ...options,
  });
