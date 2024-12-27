import { CreateModel, ModelData } from "@modules/Model";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CreateModelPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: ModelData, reset: () => void) => {
    const jsonData = {
      modelName: data.modelName,
      variables: data.variables,
    };

    try {
      const response = await axios.post("http://localhost:8080/add", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
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
    navigate("/model");
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Create Model</h1>
      <CreateModel onFormSubmit={handleSubmit} onCancel={handleCancel} />
    </Container>
  );
};
