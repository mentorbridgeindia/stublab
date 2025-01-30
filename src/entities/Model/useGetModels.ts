import { IQueryConfig } from "@/api/types";
import { STALE_TIME_FOR_NOT_URGENT_UPDATES } from "@api/constants";
import { MODELS_ENDPOINT } from "@api/endpoints";
import { fetchData } from "@api/Get/fetchData";
import { useQuery } from "@tanstack/react-query";
import { IModelEntity } from "./Model.types";

const ENTITY_TYPE = "model";

const getModels = async () => {
  return await fetchData<IModelEntity[]>(MODELS_ENDPOINT);
};

export const useGetModels = ({ queryConfig }: IQueryConfig = {}) =>
  useQuery<IModelEntity[]>({
    queryKey: [ENTITY_TYPE],
    queryFn: getModels,
    staleTime: STALE_TIME_FOR_NOT_URGENT_UPDATES,
    ...queryConfig,
  });
