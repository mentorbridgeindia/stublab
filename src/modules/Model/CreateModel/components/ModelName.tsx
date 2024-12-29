import { FormLabel } from "@atoms/FormLabel";
import { Col, Form, Row } from "react-bootstrap";
export const ModelName = ({ register, errors }: any) => {
  return (
    <Row className="align-items-center mb-4 mx-sm-5">
      <Col sm={12} md={3} lg={2} className="mb-2">
        <FormLabel>Model Name</FormLabel>
      </Col>
      <Col sm={10} md={6} lg={4}>
        <Form.Control
          {...register("name", {
            required: "Please enter model name",
          })}
          type="text"
          placeholder="Ex: Address"
          className="model-name-input"
          isInvalid={!!errors?.name}
        />
        {errors?.name && (
          <p className="text-danger fs-6">{errors.name.message}</p>
        )}
      </Col>
    </Row>
  );
};
