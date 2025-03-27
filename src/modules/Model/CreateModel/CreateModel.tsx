import { useForm } from "react-hook-form";

import { Loader } from "@atoms/Loader";
import {
  IModelMutation,
  useCreateModel,
  useGetModelById,
  useUpdateModel,
} from "@entities/Model";
import { useIsDesktop } from "@hooks/useIsDesktop";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ModelFormDesktop } from "./ModelFormDesktop";
import { ModelFormMobile } from "./ModelFormMobile";

export const CreateModel = () => {
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: model, isLoading } = useGetModelById(
    id ?? "",
    id !== undefined
  );

  const form = useForm<IModelMutation>({
    defaultValues: {
      modelName: "",
      variables: [
        {
          name: "",
          // @ts-ignore
          type: "",
          isNullable: false,
          defaultValue: "",
          sampleText: "",
        },
      ],
    },
  });

  useEffect(() => {
    if (model) {
      form.reset(model);
    }
  }, [model, form]);

  const handleError = (error: any) => {
    toast.error("Something went wrong. Please try again.");
  };

  const { mutate: createModel, isPending } = useCreateModel({
    onSuccess: (res) => {
      toast.success("Model created successfully!");
      queryClient.invalidateQueries({ queryKey: ["model"] });
      navigate("/model");
    },
    onError: (error) => handleError(error),
  });

  const { mutate: updateModel, isPending: isUpdating } = useUpdateModel({
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["model"] });
      toast.success("Model updated successfully!");
      navigate("/model");
    },
    onError: (error) => handleError(error),
  });

  const handleSubmit = async (data: IModelMutation, reset: () => void) => {
    const jsonData = {
      id: id ?? "",
      modelName: data.modelName,
      variables: data.variables.map((variable) => ({
        ...variable,
        name: variable.name.charAt(0).toLowerCase() + variable.name.slice(1),
        variableModel:
          (variable.type === "object" || variable.type === "array")
            ? variable.typeDetails
            : null,
      })),
    };
    if (id) {
      updateModel(jsonData);
    } else {
      createModel(jsonData);
    }
  };

  const handleCancel = () => {
    form.reset({
      modelName: "",
      variables: [
        {
          name: "",
          type: "string",
          isNullable: false,
          defaultValue: "",
          sampleText: "",
        },
      ],
    });
    navigate("/model");
  };

  if (isLoading || isUpdating || isPending) {
    return <Loader isLoading={isLoading || isUpdating || isPending} />;
  }

  return isDesktop ? (
    <ModelFormDesktop
      onFormSubmit={handleSubmit}
      onCancel={handleCancel}
      form={form}
    />
  ) : (
    <ModelFormMobile
      onFormSubmit={handleSubmit}
      onCancel={handleCancel}
      form={form}
    />
  );
};
