import { IMutationParams, MutationResponse } from "@/api/types";
import { CUSTOM_APIS_ENDPOINT } from "@api/endpoints";
import { sendData } from "@api/Post/sendData";
import { useMutation } from "@tanstack/react-query";
import { ICustomAPIMutation } from "./CustomAPI.types";

const createCustomAPI = async (data: ICustomAPIMutation) => {
  return await sendData<ICustomAPIMutation>(CUSTOM_APIS_ENDPOINT, data);
};

export const useCreateCustomAPI = (params: IMutationParams = {}) =>
  useMutation<MutationResponse, Error, ICustomAPIMutation>({
    mutationFn: createCustomAPI,
    ...params,
  });
