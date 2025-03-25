import { FormActionButtons } from "@molecules/FormActionButtons";
import React from "react";
import { Container, Form } from "react-bootstrap";

import {
  AddVariable,
  ModelName,
  RemoveVariable,
  VariableTypes,
} from "./components";
import { ModelListObject } from "./components/ModelListObject";
import { ModelFormProps } from "./CreateModel.types";
import { useCreateModelForm } from "./hooks/useCreateModelForm";
import "./ModelFormDesktop.scss";

export const ModelFormDesktop: React.FC<ModelFormProps> = ({
  onFormSubmit,
  onCancel,
  form,
}) => {
  const {
    onSubmit,
    fields,
    append,
    remove,
    handleSubmit,
    register,
    errors,
    watch,
    isValid,
  } = useCreateModelForm({
    form,
    onFormSubmit,
  });

  const convertToPascalCase = (str: string): string => {
    if (!str) return "";

    str = str.charAt(0).toLowerCase() + str.slice(1);
    return str
      .replace(/\s+(.)/g, (_, char) => char.toUpperCase())
      .replace(/\./g, "")
      .replace(/^\w/, (char) => char.toLowerCase());
  };

  return (
    <Container>
      <div className="model-form-container">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-header">
            <ModelName register={register} errors={errors} form={form} />
          </div>

          <div className="variables-section">
            <div className="section-header">
              <h3 className="section-title">Variables</h3>
              {isValid && <AddVariable append={append} isValid={isValid} />}
            </div>

            <div className="variables-grid">
              {fields.map((item, index) => (
                <div key={item.id} className="variable-card">
                  <div className="variable-header">
                    <Form.Group className="variable-name-group">
                      <Form.Label className="required">
                        Variable Name
                      </Form.Label>
                      <Form.Control
                        {...register(`variables.${index}.name` as const, {
                          required: "Please enter variable name",
                        })}
                        type="text"
                        placeholder="Variable name (e.g., city)"
                        defaultValue={
                          form?.getValues().variables?.[index]?.name || ""
                        }
                        isInvalid={!!errors?.variables?.[index]?.name}
                        onChange={(e) =>
                          (e.target.value = convertToPascalCase(e.target.value))
                        }
                        className="variable-name-input"
                      />
                      {errors?.variables?.[index]?.name && (
                        <Form.Text className="error-message">
                          {errors?.variables?.[index]?.name?.message}
                        </Form.Text>
                      )}
                    </Form.Group>

                    {fields.length > 1 && (
                      <RemoveVariable remove={remove} index={index} />
                    )}
                  </div>

                  <div className="variable-content">
                    <div className="variable-row">
                      <Form.Group className="type-group">
                        <Form.Label className="required">Type</Form.Label>
                        <VariableTypes
                          register={register}
                          index={index}
                          errors={errors}
                          form={form}
                        />
                      </Form.Group>

                      <Form.Group className="nullable-group">
                        <Form.Label>Nullable</Form.Label>
                        <Form.Check
                          {...register(
                            `variables.${index}.isNullable` as const
                          )}
                          type="switch"
                          id={`nullable-switch-${index}`}
                          defaultChecked={
                            form?.getValues().variables?.[index]?.isNullable
                          }
                          className="nullable-switch"
                        />
                      </Form.Group>
                    </div>

                    {(watch(`variables.${index}.type`) === "object" ||
                      watch(`variables.${index}.type`) === "array") && (
                      <div className="variable-row">
                        <Form.Group className="type-group">
                          <Form.Label className="required">Model</Form.Label>
                          <ModelListObject
                            register={register}
                            index={index}
                            errors={errors}
                            form={form}
                          />
                        </Form.Group>
                      </div>
                    )}

                    <div className="variable-row">
                      <Form.Group>
                        <Form.Label>Default Value</Form.Label>
                        <Form.Control
                          {...register(
                            `variables.${index}.defaultValue` as const
                          )}
                          type="text"
                          placeholder="Enter default value"
                          defaultValue={
                            form?.getValues().variables?.[index]
                              ?.defaultValue ?? ""
                          }
                        />
                      </Form.Group>
                    </div>

                    <div className="variable-row">
                      <Form.Group>
                        <Form.Label>Sample Text</Form.Label>
                        <Form.Control
                          {...register(
                            `variables.${index}.sampleText` as const
                          )}
                          type="text"
                          placeholder="Example: Chennai"
                          defaultValue={
                            form?.getValues().variables?.[index]?.sampleText ??
                            ""
                          }
                        />
                      </Form.Group>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <FormActionButtons
              primaryLabel="Create Model"
              secondaryLabel="Cancel"
              onCancel={onCancel}
              onSubmit={handleSubmit(onSubmit)}
            />
          </div>
        </Form>
      </div>
    </Container>
  );
};
