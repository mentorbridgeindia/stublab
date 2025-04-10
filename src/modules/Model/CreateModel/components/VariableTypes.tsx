import { Form } from "react-bootstrap";
export const VariableTypes = ({ register, index, errors, form }: any) => {
  return (
    <>
      <Form.Select
        {...register(`variables.${index}.type` as const, {
          required: "Please choose variable type",
        })}
        isInvalid={!!errors?.variables?.[index]?.type}
        required
        defaultValue={form?.getValues().variables?.[index]?.type || ""}
      >
        <option value="">Select Type</option>
        <option value="string">String</option>
        <option value="number">Number</option>
        <option value="boolean">Boolean</option>
        <option value="object">Object</option>
        <option value="array">Array</option>
      </Form.Select>
      {errors?.variables?.[index]?.type && (
        <p className="text-danger fs-6">
          {errors.variables[index].type.message}
        </p>
      )}
    </>
  );
};
