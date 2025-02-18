import { IOrganizationMutation } from "@entities/Organization/Organization.types";
import { useCreateOrganization } from "@entities/Organization/useCreateOrganization";
import { ReactComponent as IconCrossCircle } from "@icons/icon-cross.svg";
import { FormActionButtons } from "@molecules/FormActionButtons";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormLabel } from "@atoms/FormLabel";
import { useGetInit } from "@entities/Organization/useGetOrganization";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { orgSchema } from "./orgSchema";

const CreateOrganization = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrganizationMutation>({
    resolver: yupResolver(orgSchema),
  });

  const data = useGetInit();

  const { mutate: createOrganization } = useCreateOrganization({
    onSuccess: () => {
      toast.success("Organization created successfully!");
      navigate("/home");
    },
    onError: (error: Error) => {
      console.log("error ", error);
      // @ts-ignore
      if (error.status === 403) {
        setError("Sub Domain is not available");
      }
    },
  });

  useEffect(() => {
    if (data) {
      navigate("/home");
    }
  }, [data, navigate]);

  const onSubmit = (data: IOrganizationMutation) => {
    createOrganization(data);
  };

  return (
    <div className="mt-5 py-5 d-flex justify-content-center align-items-center">
      <div className="card shadow-sm" style={{ width: "40%" }}>
        <div className="card-body">
          <h2 className="mb-5 text-center">Create Organization</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <FormLabel htmlFor="name" className="form-label">
                Organization Name
              </FormLabel>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    id="name"
                    {...field}
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Organization Name"
                  />
                )}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            <div className="mb-5">
              <FormLabel htmlFor="name" className="form-label">
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
                        errors.subDomain ? "is-invalid" : ""
                      }`}
                    />
                  )}
                />
                <InputGroup.Text className="text-small">
                  .mock-api.stublab.in
                </InputGroup.Text>
              </InputGroup>
              {errors.subDomain && (
                <div className="invalid-feedback">
                  {errors.subDomain.message}
                </div>
              )}
              {error && (
                <div
                  className={`d-flex align-items-center gap-2 text-small text-danger fs-8`}
                >
                  <IconCrossCircle /> Sub Domain is not available
                </div>
              )}
            </div>
            <div className="mb-5">
              <FormLabel htmlFor="website" className="form-label">
                Website
              </FormLabel>
              <Controller
                name="website"
                control={control}
                render={({ field }) => (
                  <input
                    type="url"
                    id="website"
                    {...field}
                    className={`form-control ${
                      errors.website ? "is-invalid" : ""
                    }`}
                    placeholder="https://example.com"
                  />
                )}
              />
              {errors.website && (
                <div className="invalid-feedback">{errors.website.message}</div>
              )}
            </div>

            <FormActionButtons
              primaryLabel="Submit"
              secondaryLabel="Cancel"
              onCancel={() => toast.info("Form cancelled.")}
              onSubmit={handleSubmit(onSubmit)}
              isPrimaryDisabled={!!Object.keys(errors).length}
              isPrimaryDelete={false}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrganization;
