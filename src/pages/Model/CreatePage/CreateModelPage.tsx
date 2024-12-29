import { CreateModel } from "@modules/Model";
import { Container } from "react-bootstrap";

export const CreateModelPage = () => {
  return (
    <Container>
      <h1 className="my-4 text-center">Create Model</h1>
      <CreateModel />
    </Container>
  );
};
