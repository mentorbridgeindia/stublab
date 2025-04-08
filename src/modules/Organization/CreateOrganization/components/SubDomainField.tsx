import { IOrganizationMutation } from "@entities/Organization/Organization.types";
import { Form, FormLabel, InputGroup } from "react-bootstrap";
import { Control, Controller, FieldErrors } from "react-hook-form";

export const SubDomainField = ({
  control,
  error,
  isSubmitted,
}: {
  control: Control<any>;
  error: FieldErrors<IOrganizationMutation>;
  isSubmitted: boolean;
}) => (
  <div className="mb-3">
    <FormLabel htmlFor="subDomain" className="form-label">
      Sub Domain
    </FormLabel>
    <InputGroup className="mb-3">
      <Controller
        name="subDomain"
        control={control}
        render={({ field }) => (
          <Form.Control
            type="text"
            {...field}
            className={`form-control ${
              error && isSubmitted ? "is-invalid" : ""
            }`}
            onChange={(e) => field.onChange(e.target.value?.toLowerCase())}
          />
        )}
      />
      <InputGroup.Text className="text-small">
        .mock-api.stublab.in
      </InputGroup.Text>
    </InputGroup>
    {error && (
      <div className="invalid-feedback">{error.subDomain?.message}</div>
    )}
    {error && isSubmitted && (
      <div className="d-flex align-items-center gap-2 text-small text-danger fs-8">
        <span className="icon-cross-circle" aria-hidden="true" /> Sub Domain is
        not available
      </div>
    )}
  </div>
);
