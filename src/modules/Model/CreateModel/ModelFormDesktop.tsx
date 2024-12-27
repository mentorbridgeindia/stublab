import { FormActionButtons } from "@molecules/FormActionButtons";
import React from "react";
import { Container, Form, Table } from "react-bootstrap";

import { ModelFormProps } from "./CreateModel.types";
import {
  AddVariable,
  ModelName,
  RemoveVariable,
  VariableTypes,
} from "./components";
import { useCreateModelForm } from "./hooks/useCreateModelForm";

export const ModelFormDesktop: React.FC<ModelFormProps> = ({
  onFormSubmit,
  onCancel,
  form,
}) => {
  const { onSubmit, fields, append, remove, handleSubmit, register, errors } =
    useCreateModelForm({
      form,
      onFormSubmit,
    });

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
            onCancel={onCancel}
            onSubmit={handleSubmit(onSubmit)}
          />
        </Form>
      </div>
    </Container>
  );
};
