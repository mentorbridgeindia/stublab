import { sendData } from "@api/Post/sendData";
import { useIsDesktop } from "@hooks/useIsDesktop";
import { ModelForm, ModelFormMobile } from "@modules/ModelForm";
import { ModelData } from "@modules/ModelForm/ModelForm.types";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CreateModelPage = () => {
  const isDesktop = useIsDesktop();

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

  return (
    <Container>
      <h1 className="my-4 text-center">Create Model</h1>
      {isDesktop ? (
        <ModelForm onFormSubmit={handleSubmit} />
      ) : (
        <ModelFormMobile onFormSubmit={handleSubmit} />
      )}
    </Container>
  );
};
