import { FormActionButtons } from "@molecules/FormActionButtons";
import React from "react";
import { Container, Form, Table } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";

import { ModelData, ModelFormProps } from "./CreateModel.types";
import {
  AddVariable,
  ModelName,
  RemoveVariable,
  VariableTypes,
} from "./components";

export const ModelForm: React.FC<ModelFormProps> = ({
  onFormSubmit,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ModelData>({
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variables",
  });

  const onSubmit = async (data: ModelData) => {
    onFormSubmit(data, reset);
  };

  const handleCancel = () => {
    reset({
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

  return (
    <Container>
      <div className="model-container border p-4 rounded bg-light">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModelName register={register} errors={errors} />
          <hr />

          <Table responsive borderless>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Nullable</th>
                <th>Default Value</th>
                <th>Sample Text</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <Form.Control
                      {...register(`variables.${index}.name` as const, {
                        required: "Please enter variable name",
                      })}
                      type="text"
                      placeholder="Ex: City"
                      isInvalid={!!errors?.variables?.[index]?.name}
                    />
                    {errors?.variables?.[index]?.name && (
                      <p className="text-danger fs-6">
                        {errors?.variables?.[index]?.name?.message}
                      </p>
                    )}
                  </td>
                  <td>
                    <VariableTypes
                      register={register}
                      index={index}
                      errors={errors}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register(`variables.${index}.isNullable` as const)}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <Form.Control
                      {...register(`variables.${index}.defaultValue` as const)}
                      type="text"
                      placeholder=""
                    />
                  </td>
                  <td>
                    <Form.Control
                      {...register(`variables.${index}.sampleText` as const)}
                      type="text"
                      placeholder="Ex: Chennai"
                    />
                  </td>
                  <td className="d-flex justify-content-center">
                    <RemoveVariable remove={remove} index={index} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <AddVariable append={append} />

          <FormActionButtons
            primaryLabel="Submit"
            secondaryLabel="Cancel"
            onCancel={handleCancel}
            onSubmit={handleSubmit(onSubmit)}
          />
        </Form>
      </div>
    </Container>
  );
};
