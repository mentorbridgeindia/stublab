import { useFieldArray } from "react-hook-form";

import { IUseCreateModel, ModelData } from "../CreateModel.types";

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

  const onSubmit = async (data: ModelData) => {
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
  };
};
