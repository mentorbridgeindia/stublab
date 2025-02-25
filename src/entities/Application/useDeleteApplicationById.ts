import { IQueryConfig } from "@/api/types";
import { STALE_TIME_FOR_NOT_URGENT_UPDATES } from "@api/constants";
import { APPLICATIONS_ENDPOINT } from "@api/endpoints";
import { useQuery } from "@tanstack/react-query";
import { deleteData } from "../../api";
import { IApplicationEntity } from "./Application.types";

const ENTITY_TYPE = "application";

const deleteApplicationById = async (id: string) => {
  return await deleteData<IApplicationEntity>(`${APPLICATIONS_ENDPOINT}/${id}`);
};


export const useDeleteApplicationById = (id: string, enabled = false) =>
  useQuery<IApplicationEntity>({
    queryKey: [ENTITY_TYPE],
    queryFn: () => deleteApplicationById(id),
    staleTime: STALE_TIME_FOR_NOT_URGENT_UPDATES,
    enabled,
  });
