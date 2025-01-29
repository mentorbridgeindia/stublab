import { IQueryConfig } from "@/api/types";
import { STALE_TIME_FOR_NOT_URGENT_UPDATES } from "@api/constants";
import { MODELS_ENDPOINT } from "@api/endpoints";
import { fetchData } from "@api/Get/fetchData";
import { useQuery } from "@tanstack/react-query";
import { IModelEntity } from "./Model.types";

const ENTITY_TYPE = "model";

const getModelById = async (id: string) => {
  return await fetchData<IModelEntity>(`${MODELS_ENDPOINT}/${id}`);
};

export const useGetModelById = (id: string, queryConfig: IQueryConfig) =>
  useQuery<IModelEntity>({
    queryKey: [ENTITY_TYPE, id],
    queryFn: () => getModelById(id),
    staleTime: STALE_TIME_FOR_NOT_URGENT_UPDATES,
    ...queryConfig,
  });
