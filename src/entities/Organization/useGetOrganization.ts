import { STALE_TIME_FOR_NOT_URGENT_UPDATES } from "@api/constants";
import { INIT_ENDPOINT, ORGANIZATION_ENDPOINT } from "@api/endpoints";
import { fetchData } from "@api/Get/fetchData";
import { useQuery } from "@tanstack/react-query";
import { IOrganizationEntity } from "./Organization.types";

const ENTITY_TYPE = "application";

const getOrganization = async () => {
  return await fetchData<IOrganizationEntity>(`${ORGANIZATION_ENDPOINT}`);
};

const getInit = async () => {
  return await fetchData<IOrganizationEntity>(`${INIT_ENDPOINT}`);
};

export const useGetOrganization = () =>
  useQuery<IOrganizationEntity>({
    queryKey: [ENTITY_TYPE],
    queryFn: getOrganization,
    staleTime: STALE_TIME_FOR_NOT_URGENT_UPDATES,
  });

export const useGetInit = () =>
  useQuery<IOrganizationEntity>({
    queryKey: [ENTITY_TYPE],
    queryFn: getInit,
    staleTime: STALE_TIME_FOR_NOT_URGENT_UPDATES,
  });
