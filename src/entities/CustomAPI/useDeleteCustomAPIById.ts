import { IQueryConfig } from "@/api/types";
import { STALE_TIME_FOR_NOT_URGENT_UPDATES } from "@api/constants";
import { CUSTOM_APIS_ENDPOINT } from "@api/endpoints";
import { useQuery } from "@tanstack/react-query";
import { deleteData } from "../../api";
import { ICustomAPIEntity } from "./CustomAPI.types";

const deleteCustomAPIById = async (id: string) => {
  return await deleteData<ICustomAPIEntity>(`${CUSTOM_APIS_ENDPOINT}/${id}`);
};

export const useDeleteCustomAPIById = (
  id: string,
  queryConfig: IQueryConfig
) =>
  useQuery<ICustomAPIEntity>({
    queryKey: ['deleteCustomAPI', id],
    queryFn: () => deleteCustomAPIById(id),
    staleTime: STALE_TIME_FOR_NOT_URGENT_UPDATES,
    ...queryConfig,
  });
