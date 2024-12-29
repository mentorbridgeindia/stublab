import { IMutationParams, MutationResponse } from "@/api/types";
import { MODELS_ENDPOINT } from "@api/endpoints";
import { sendData } from "@api/Post/sendData";
import { useMutation } from "@tanstack/react-query";
import { IModelMutation } from "./Model.types";

const createModel = async (data: IModelMutation) => {
  return await sendData<IModelMutation>(MODELS_ENDPOINT, data);
};

export const useCreateModel = (params: IMutationParams = {}) =>
  useMutation<MutationResponse, Error, IModelMutation>({
    mutationFn: createModel,
    ...params,
  });
