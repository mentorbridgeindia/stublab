import { IMutationParams, MutationResponse } from "@/api/types";
import { MODELS_ENDPOINT } from "@api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { deleteData } from "../../api";

const deleteModelById = async (id: string) => {
  return await deleteData<IMutationParams>(`${MODELS_ENDPOINT}/${id}`);
};

export const useDeleteModelById = (id: string, params: IMutationParams) =>
  useMutation<MutationResponse, Error, string>({
    mutationFn: () => deleteModelById(id),
    ...params,
  });
