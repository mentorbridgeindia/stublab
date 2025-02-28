import { useFieldArray } from "react-hook-form";

import { IModelMutation } from "@entities/Model";
import { IUseCreateModel } from "../CreateModel.types";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateModelForm = ({ form, onFormSubmit }: IUseCreateModel) => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variables",
  });
  const queryClient = useQueryClient();

  const onSubmit = async (data: IModelMutation) => {
    onFormSubmit(data, reset);
    queryClient.invalidateQueries({queryKey:["createmodel"]})
  };

  return {
    onSubmit,
    fields,
    append,
    remove,
    handleSubmit,
    register,
    errors,
  };
};
