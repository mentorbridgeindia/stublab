import React from "react";
import { useForm } from "react-hook-form";

import { useIsDesktop } from "@hooks/useIsDesktop";
import { ICreateModel, ModelData } from "./CreateModel.types";
import { ModelFormDesktop } from "./ModelFormDesktop";
import { ModelFormMobile } from "./ModelFormMobile";

export const CreateModel: React.FC<ICreateModel> = ({
  onFormSubmit,
  onCancel,
}) => {
  const isDesktop = useIsDesktop();

  const form = useForm<ModelData>({
    defaultValues: {
      modelName: "",
      variables: [
        {
          name: "",
          type: "String",
          isNullable: false,
          defaultValue: "",
          sampleText: "",
        },
      ],
    },
  });

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
    onCancel();
  };

  return isDesktop ? (
    <ModelFormDesktop
      onFormSubmit={onFormSubmit}
      onCancel={handleCancel}
      form={form}   />
  ) : (
    <ModelFormMobile
      onFormSubmit={onFormSubmit}
      onCancel={handleCancel}
      form={form}
    />
  );
};