import { IQueryConfig } from "@/api/types";
import { STALE_TIME_FOR_NOT_URGENT_UPDATES } from "@api/constants";
import { APPLICATIONS_ENDPOINT } from "@api/endpoints";
import { fetchData } from "@api/Get/fetchData";
import { useQuery } from "@tanstack/react-query";
import { IApplicationEntity } from "./Application.types";

const ENTITY_TYPE = "application";

const getApplications = async () => {
  return await fetchData<IApplicationEntity[]>(APPLICATIONS_ENDPOINT);
};

export const useGetApplications = ({ queryConfig }: IQueryConfig = {}) =>
  useQuery<IApplicationEntity[]>({
    queryKey: [ENTITY_TYPE],
    queryFn: getApplications,
    staleTime: STALE_TIME_FOR_NOT_URGENT_UPDATES,
    ...queryConfig,
  });
