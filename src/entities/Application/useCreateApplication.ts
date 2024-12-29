import { IMutationParams, MutationResponse } from "@/api/types";
import { APPLICATIONS_ENDPOINT } from "@api/endpoints";
import { sendData } from "@api/Post/sendData";
import { useMutation } from "@tanstack/react-query";
import { IApplicationMutation } from "./Application.types";

const createApplication = async (data: IApplicationMutation) => {
  return await sendData<IApplicationMutation>(APPLICATIONS_ENDPOINT, data);
};

export const useCreateApplication = (params: IMutationParams = {}) =>
  useMutation<MutationResponse, Error, IApplicationMutation>({
    mutationFn: createApplication,
    ...params,
  });
