import { IMutationParams, MutationResponse } from "@/api/types";
import { APPLICATIONS_ENDPOINT } from "@api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { updateData } from "../../api";
import { IApplicationMutation } from "./Application.types";

const updateApplication = async (data: IApplicationMutation) => {
  return await updateData<IApplicationMutation>(APPLICATIONS_ENDPOINT, data);
};

export const useUpdateApplication = (params: IMutationParams = {}) =>
  useMutation<MutationResponse, Error, IApplicationMutation>({
    mutationFn: updateApplication,
    ...params,
  });
