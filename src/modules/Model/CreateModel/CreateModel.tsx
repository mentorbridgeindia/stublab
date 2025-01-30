import { useForm } from "react-hook-form";

import { IModelMutation, useCreateModel } from "@entities/Model";
import { useIsDesktop } from "@hooks/useIsDesktop";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ModelFormDesktop } from "./ModelFormDesktop";
import { ModelFormMobile } from "./ModelFormMobile";

export const CreateModel = () => {
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();

  const form = useForm<IModelMutation>({
    defaultValues: {
      name: "",
      variables: [
        {
          name: "",
          type: "string",
          isNullable: false,
          defaultValue: "",
          sampleText: "",
        },
      ],
    },
  });

  const handleError = (error: any) => {
    toast.error("Something went wrong. Please try again.");
  };

  const { mutate: createModel, isPending } = useCreateModel({
    onSuccess: (res) => {
      if (res.status === 201) {
        toast.success("Model data submitted successfully!");
        navigate("/model");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
    onError: (error) => handleError(error),
  });

  const handleSubmit = async (data: IModelMutation, reset: () => void) => {
    const jsonData = {
      name: data.name,
      variables: data.variables,
    };
    createModel(jsonData);
  };

  const handleCancel = () => {
    form.reset({
      name: "",
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

  return isDesktop ? (
    <ModelFormDesktop
      onFormSubmit={handleSubmit}
      onCancel={handleCancel}
      form={form}   />
  ) : (
    <ModelFormMobile
      onFormSubmit={handleSubmit}
      onCancel={handleCancel}
      form={form}
    />
  );
};