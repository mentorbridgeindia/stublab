import { useGetModels } from "@entities/Model/useGetModels";
import { Form } from "react-bootstrap";
export const ModelListObject = ({ register, index, errors, form }: any) => {
  const { data: modelsList } = useGetModels();

  return (
    <>
      <Form.Select
        {...register(`variables.${index}.variableModel` as const, {
          required: "Please choose Model",
        })}
        isInvalid={!!errors?.variables?.[index]?.variableModel}
        required
        defaultValue={form?.getValues().variables?.[index]?.variableModel || ""}
      >
        <option value="">Select Type</option>
        {modelsList?.map((model) => (
          <option value={model.id} key={model.id}>
            {model.modelName}
          </option>
        ))}
      </Form.Select>
      {errors?.variables?.[index]?.variableModel && (
        <p className="text-danger fs-6">
          {errors.variables[index].variableModel.message}
        </p>
      )}
    </>
  );
};
