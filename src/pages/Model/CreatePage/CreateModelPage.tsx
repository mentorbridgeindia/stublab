import { ModelForm, ModelFormMobile } from "@/modules/Model/CreateModel";
import { sendData } from "@api/Post/sendData";
import { useIsDesktop } from "@hooks/useIsDesktop";
import { ModelData } from "@modules/Model/CreateModel";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CreateModelPage = () => {
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();

  const handleSubmit = async (data: ModelData) => {
    const jsonData = {
      modelName: data.modelName,
      variables: data.variables,
    };

    try {
      const response = await sendData("http://localhost:8080/add", jsonData);

      if (response) {
        toast.success("Model data submitted successfully!");
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
      {isDesktop ? (
        <ModelForm onFormSubmit={handleSubmit} onCancel={handleCancel} />
      ) : (
        <ModelFormMobile onFormSubmit={handleSubmit} onCancel={handleCancel} />
      )}
    </Container>
  );
};
