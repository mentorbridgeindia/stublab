import { IMutationParams, MutationResponse } from "@/api/types";
import { ORANIZATION_ENDPOINT } from "@api/endpoints";
import { sendData } from "@api/Post/sendData";
import { useMutation } from "@tanstack/react-query";
import { IOrganizationMutation } from "./Organization.types";

const createOrganization = async (data: IOrganizationMutation) => {
  return await sendData<IOrganizationMutation>(ORANIZATION_ENDPOINT, data);
};

export const useCreateOrganization = (params: IMutationParams = {}) =>
  useMutation<MutationResponse, Error, IOrganizationMutation>({
    mutationFn: createOrganization,
    ...params,
  });
