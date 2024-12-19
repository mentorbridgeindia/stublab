import { ReactComponent as IconPlus } from "@icons/icon-plus.svg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ModelIndexPage = () => {
  const navigate = useNavigate();

  const handleCreateModel = () => {
    navigate("/model/create");
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button onClick={handleCreateModel}>
          <IconPlus />
          Create Model
        </Button>
      </div>
    </div>
  );
};
