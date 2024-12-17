import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";
import { FormLabel } from "@/ui/atoms/FormLabel";
import { FormInput } from "@/ui/atoms/FormInput";
import { ModelData } from "./ModelForm.types";
import FormAction from "@/ui/molecules/FormActionButtons";

const ModelFormMobile: React.FC = () => {
  const { control, handleSubmit, register, reset, formState: { errors } } = useForm<ModelData>({
    defaultValues: {
      modelName: "",
      variables: [
        { name: "", type: "string", isNullable: false, defaultValue: "", sampleText: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variables",
  });

  const onSubmit = async (data: ModelData) => {
    try {
      const response = await axios.post("http://localhost:8080/add", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        toast.success("Model data submitted successfully!");
        reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to submit model data. Please check the server.");
    }
  };

  const handleCancel = () => {
    reset({
      modelName: "",
      variables: [
        { name: "", type: "string", isNullable: false, defaultValue: "", sampleText: "" },
      ],
    });
    toast.info("Form reset");
  };

  return (
    <Container fluid>
      <ToastContainer position="top-center" />
      <h2 className="text-center my-3">Create API Models</h2>
      <div className="model-container border rounded p-3 bg-light">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <FormLabel>Model Name</FormLabel>
            <FormInput
              {...register("modelName", { required: "Please enter model name" })}
              type="text"
              placeholder="Enter model name"
              className="mx-2 w-50 d-block "
            />
            {errors.modelName && <p className="text-danger small">{errors.modelName.message}</p>}
          </Form.Group>

          <hr />

          {fields.map((item, index) => (
            <div key={item.id} className="border rounded p-2 mb-3 bg-white shadow-sm">
              <Form.Group className="mb-2">
                <FormLabel>Variable Name</FormLabel>
                <FormInput
                  {...register(`variables.${index}.name`, { required: "Variable name is required" })}
                  placeholder="Enter variable name"
                  className="mx-2 w-50 d-block "
                />
                {errors.variables?.[index]?.name && (
                  <p className="text-danger small">{errors.variables[index]?.name?.message}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-2">
                <FormLabel>Type</FormLabel>
                <Form.Select {...register(`variables.${index}.type`)} className="mx-2 w-50 d-block ">
                  <option value="string">String</option>
                  <option value="int">Int</option>
                  <option value="long">Long</option>
                  <option value="boolean">Boolean</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2 d-flex  align-items-center">
                <FormLabel className="mt-2">Is Nullable</FormLabel>
                <Form.Check
                  {...register(`variables.${index}.isNullable`)}
                  type="checkbox"
                  className="ms-4"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <FormLabel>Default Value</FormLabel>
                <FormInput
                  {...register(`variables.${index}.defaultValue`)}
                  placeholder="Enter default value"
                  className="mx-2 w-50 d-block "
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <FormLabel>Sample Text</FormLabel>
                <FormInput
                  {...register(`variables.${index}.sampleText`)}
                  placeholder="Enter sample text"
                  className="mx-2 w-50 d-block "
                />
              </Form.Group>

              <div className="d-flex justify-content-end p-2 pe-4">
                <Button variant="danger" onClick={() => remove(index)} size="sm">
                  <FaTrash />
                </Button>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-start justify-content-between mb-3 ">
            <Button
              variant="outline-primary"
              onClick={() =>
                append({
                  name: "",
                  type: "string",
                  isNullable: false,
                  defaultValue: "",
                  sampleText: "",
                })
              }
            >
              <CiCirclePlus size={20} className="mb-1" /> Add Variable
            </Button>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <FormAction
              primaryLabel="Submit"
              secondaryLabel="Cancel"
              onSubmit={handleSubmit(onSubmit)}
              onCancel={handleCancel}
              isPrimaryDisabled={false} 
            />
         
      </div>
    </Form>
      </div >
    </Container >
  );
};

export default ModelFormMobile;
