import { IMutationParams, MutationResponse } from "@/api/types";
import { CUSTOM_APIS_ENDPOINT } from "@api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { updateData } from "../../api";
import { ICustomAPIMutation } from "./CustomAPI.types";

const updateCustomAPI = async (data: ICustomAPIMutation) => {
  return await updateData<ICustomAPIMutation>(CUSTOM_APIS_ENDPOINT + "/" + data.id, data);
};

export const useUpdateCustomAPI = (params: IMutationParams = {}) =>
  useMutation<MutationResponse, Error, ICustomAPIMutation>({
    mutationFn: updateCustomAPI,
    ...params,
  });
