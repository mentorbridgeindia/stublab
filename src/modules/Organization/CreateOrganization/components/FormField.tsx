import { Control, Controller, FieldErrors } from "react-hook-form";

import { IOrganizationMutation } from "@entities/Organization/Organization.types";
import { FormLabel } from "react-bootstrap";

export const FormField = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  error,
  isDirty,
  isSubmitted,
}: {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  error: FieldErrors<IOrganizationMutation>;
  isDirty: boolean;
  isSubmitted: boolean;
}) => (
  <div className="mb-3">
    <FormLabel htmlFor={name} className="form-label">
      {label}
    </FormLabel>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          type={type}
          id={name}
          {...field}
          className={`form-control ${
            error && isSubmitted ? "is-invalid" : ""
          } ${isDirty ? "is-dirty" : ""}`}
          placeholder={placeholder}
        />
      )}
    />
    {error && (
      <div className="invalid-feedback">
        {error[name as keyof IOrganizationMutation]?.message}
      </div>
    )}
  </div>
);
