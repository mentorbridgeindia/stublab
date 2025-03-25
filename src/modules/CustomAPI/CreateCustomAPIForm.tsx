import { MethodTypes } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormActionButtons } from "@molecules/FormActionButtons";
import { Drawer } from "@organisms/Drawer";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./CreateCustomAPIForm.scss";
import { ICreateCustomAPIForm } from "./CreateCustomAPIForm.types";
import { dropdownData } from "./dropdownData";
import { ResponseStatuses } from "./ReponseStatuses";
import { schema } from "./schema";

export const CreateCustomAPIForm = ({
  onSubmit,
  onCancel,
  initialValues,
}: any) => {
  const {
    register,
    setValue,
    watch,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<ICreateCustomAPIForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      method: initialValues?.method || "GET",
      ...initialValues,
    },
  });

  const values = watch();

  const renderVariant = () => {
    return dropdownData.methods.find((item) => item.value === values.method)
      ?.color;
  };

  const triggerValidation = (field: keyof ICreateCustomAPIForm) => {
    isSubmitted && trigger(field);
  };

  const triggerSubmit = async () => {
    const isValid = await trigger();
    if (!!isValid && values.responseStatusCodes?.length > 0) {
      onSubmit(values);
    }
  };

  return (
    <Drawer
      show={true}
      onHide={onCancel}
      title={initialValues ? "Edit API" : "Create Custom API"}
    >
      <div className="api-form-container">
        <Form>
          <div className="form-section">
            <div className="form-header">
              <h3 className="section-title">API Details</h3>
            </div>

            <div className="form-content">
              <Form.Group className="form-group">
                <Form.Label>API Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter API name"
                  defaultValue={values.name}
                  isInvalid={!!errors.name}
                  onChange={(e) => {
                    setValue("name", e.target.value);
                    triggerValidation("name");
                  }}
                  className="form-control"
                />
                {errors.name && (
                  <Form.Text className="error-message">
                    {errors.name.message}
                  </Form.Text>
                )}
              </Form.Group>

              <div className="endpoint-group">
                <Form.Group className="method-group">
                  <Form.Label>Method</Form.Label>
                  <div className={`method-selector ${renderVariant()}`}>
                    <Form.Select
                      value={values.method || "GET"}
                      onChange={(e) => {
                        setValue("method", e.target.value as MethodTypes);
                        trigger("method");
                      }}
                      className="method-select"
                    >
                      {dropdownData.methods.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  {errors.method && (
                    <Form.Text className="error-message">
                      {errors.method.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="url-group">
                  <Form.Label>Endpoint URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter endpoint URL"
                    defaultValue={values.url}
                    isInvalid={!!errors.url}
                    onChange={(e) => {
                      setValue("url", e.target.value);
                      triggerValidation("url");
                    }}
                    className="url-input"
                  />
                  {errors.url && (
                    <Form.Text className="error-message">
                      {errors.url.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-header">
              <h3 className="section-title">Response Status Codes</h3>
            </div>
            <div className="form-content">
              <ResponseStatuses
                responses={values.responseStatusCodes}
                setResponses={setValue}
                errors={errors}
                trigger={triggerValidation}
              />
            </div>
          </div>

          <div className="form-actions">
            <FormActionButtons
              primaryLabel="Create API"
              secondaryLabel="Cancel"
              onCancel={onCancel}
              onSubmit={handleSubmit(triggerSubmit)}
            />
          </div>
        </Form>
      </div>
    </Drawer>
  );
};
