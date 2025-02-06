import { IMutationParams, MutationResponse } from "@/api/types";
import { MODELS_ENDPOINT } from "@api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { updateData } from "../../api";
import { IModelMutation } from "./Model.types";

const updateModel = async (data: IModelMutation) => {
  return await updateData<IModelMutation>(
    MODELS_ENDPOINT + "/" + data.id,
    data
  );
};

export const useUpdateModel = (params: IMutationParams = {}) =>
  useMutation<MutationResponse, Error, IModelMutation>({
    mutationFn: updateModel,
    ...params,
  });
