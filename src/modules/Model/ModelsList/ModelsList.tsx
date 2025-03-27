import { useGetModels } from "@entities/Model";
import { EmptyState } from "@molecules/EmptyState/EmptyState";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ViewModel } from "../ViewModel";
import { DeleteModel } from "./components/DeleteModel";
import { ModelItem } from "./components/ModelItem";
import "./ModelsList.scss";

export const ModelsList = () => {
  const navigate = useNavigate();
  const { data: models, isLoading } = useGetModels();
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [viewingModelId, setViewingModelId] = useState<string | null>(null);

  const handleEditModel = (model: any) => {
    navigate(`/model/edit/${model.id}`, { state: { model } });
  };

  if (isLoading) {
    return <div className="models-loading">Loading models...</div>;
  }

  if (models?.length === 0) {
    return <EmptyState title="No models found" />;
  }

  return (
    <div className="models-container">
      <Row className="g-4">
        {models?.map((item) => (
          <ModelItem
            key={item.id}
            item={item}
            setViewingModelId={setViewingModelId}
            handleEditModel={handleEditModel}
            setSelectedModelId={setSelectedModelId}
          />
        ))}
      </Row>

      {selectedModelId && (
        <DeleteModel
          id={selectedModelId}
          show={true}
          onHide={() => setSelectedModelId(null)}
        />
      )}

      {viewingModelId !== null && (
        <ViewModel
          id={viewingModelId}
          show={true}
          onHide={() => setViewingModelId(null)}
        />
      )}
    </div>
  );
};
