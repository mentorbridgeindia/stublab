import { ReactComponent as IconPlus } from "@icons/icon-plus.svg";
import { ModelsList } from "@modules/Model";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/ui/atoms/Loader";
import { useGetModels } from "@entities/Model/useGetModels"; 

export const ModelIndexPage = () => {
  const navigate = useNavigate();
  const { isLoading, isPending } = useGetModels();

  const handleCreateModel = () => {
    navigate("/model/create");
  };

  if (isLoading || isPending) {
    return <Loader isLoading />;
  }

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button onClick={handleCreateModel}>
          <IconPlus />
          Create Model
        </Button>
      </div>
      <div className="mt-5">
        <ModelsList />
      </div>
    </div>
  );
};
