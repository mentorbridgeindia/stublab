import { CreateModel } from "@modules/Model";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const CreateModelPage = () => {
  const { id } = useParams();
  return (
    <Container>
      <h1 className="my-4 text-center">
        {id ? "Edit Model" : "Create Model"}
      </h1>
      <CreateModel />
    </Container>
  );
};
