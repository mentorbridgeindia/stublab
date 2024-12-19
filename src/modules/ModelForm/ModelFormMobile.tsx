import { FormInput } from "@/ui/atoms/FormInput";
import { FormLabel } from "@/ui/atoms/FormLabel";
import { FormActionButtons } from "@molecules/FormActionButtons";
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import { ModelData, ModelFormProps } from "./ModelForm.types";
import {
  AddVariable,
  ModelName,
  RemoveVariable,
  VariableTypes,
} from "./components";

export const ModelFormMobile: React.FC<ModelFormProps> = ({ onFormSubmit }) => {
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
          type: "string",
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
    onFormSubmit(data,reset);
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
  };

  return (
    <Container fluid>
      <div className="model-container border rounded p-3 bg-light">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModelName register={register} errors={errors} />

          <hr />

          {fields.map((item, index) => (
            <div
              key={item.id}
              className="border rounded p-2 mb-3 bg-white shadow-sm"
            >
              <div className="d-flex justify-content-end p-2 pe-4">
                <RemoveVariable remove={remove} index={index} />
              </div>
              <Row className="align-items-center mb-4 mx-sm-5">
                <Col sm={12} md={3} lg={2} className="mb-2">
                  <FormLabel>Variable Name</FormLabel>
                </Col>
                <Col sm={10} md={6} lg={4}>
                  <Form.Control
                    {...register(`variables.${index}.name` as const, {
                      required: "Please enter variable name",
                    })}
                    type="text"
                    placeholder="Ex: City"
                    isInvalid={!!errors?.variables?.[index]?.name}
                  />
                  {errors.variables?.[index]?.name && (
                    <p className="text-danger small">
                      {errors.variables[index]?.name?.message}
                    </p>
                  )}
                </Col>
              </Row>

              <Row className="align-items-center mb-4 mx-sm-5">
                <Col sm={12} md={3} lg={2} className="mb-2">
                  <FormLabel>Type</FormLabel>
                </Col>
                <Col sm={10} md={6} lg={4}>
                  <VariableTypes
                    register={register}
                    index={index}
                    errors={errors}
                  />
                </Col>
              </Row>

              <Row className="align-items-center mb-4 mx-sm-5">
                <Col xs={5} sm={2} md={3} lg={2} className="mb-2">
                  <FormLabel>Is Nullable</FormLabel>
                </Col>
                <Col xs={5} sm={2} md={6} lg={4}>
                  <Form.Check
                    {...register(`variables.${index}.isNullable`)}
                    type="checkbox"
                    className="ms-4"
                  />
                </Col>
              </Row>

              <Row className="align-items-center mb-4 mx-sm-5">
                <Col sm={12} md={3} lg={2} className="mb-2">
                  <FormLabel>Default Value</FormLabel>
                </Col>
                <Col sm={10} md={6} lg={4}>
                  <FormInput
                    {...register(`variables.${index}.defaultValue`)}
                    placeholder=""
                  />
                </Col>
              </Row>

              <Row className="align-items-center mb-4 mx-sm-5">
                <Col sm={12} md={3} lg={2} className="mb-2">
                  <FormLabel>Sample Content</FormLabel>
                </Col>
                <Col sm={10} md={6} lg={4}>
                  <FormInput
                    {...register(`variables.${index}.sampleText`)}
                    placeholder="Ex: Chennai"
                  />
                </Col>
              </Row>
            </div>
          ))}

          <AddVariable append={append} />

          <FormActionButtons
            primaryLabel="Submit"
            secondaryLabel="Cancel"
            onSubmit={handleSubmit(onSubmit)}
            onCancel={handleCancel}
            isPrimaryDisabled={false}
          />
        </Form>
      </div>
    </Container>
  );
};
