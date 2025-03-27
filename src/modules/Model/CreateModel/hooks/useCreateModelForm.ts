import { useFieldArray } from "react-hook-form";

import { IModelMutation } from "@entities/Model";
import { IUseCreateModel } from "../CreateModel.types";

export const useCreateModelForm = ({ form, onFormSubmit }: IUseCreateModel) => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variables",
  });

  const onSubmit = async (data: IModelMutation) => {
    onFormSubmit(data, reset);
  };

  return {
    onSubmit,
    fields,
    append,
    remove,
    handleSubmit,
    register,
    errors,
    isValid,
    watch,
  };
};
