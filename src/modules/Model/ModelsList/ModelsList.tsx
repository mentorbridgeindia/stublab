import { useGetModels } from "@entities/Model";
import { ReactComponent as IconDotsVertical } from "@icons/icon-dots-vertical.svg";
import { ReactComponent as IconEye } from "@icons/icon-eye.svg";
import { ReactComponent as IconPencil } from "@icons/icon-pencil.svg";
import { ReactComponent as IconTrash } from "@icons/icon-trash.svg";
import { Dropdown } from "@molecules/Dropdown/Dropdown";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ViewModel } from "../ViewModel";
import { transformData } from "../ViewModel/helpers";
import { DeleteModel } from "./components/DeleteModel";
import "./ModelsList.scss";
import { sample } from "./sample";
import { json } from "@codemirror/lang-json";

export const ModelsList = () => {
  const navigate = useNavigate();
  const { data: models, isLoading } = useGetModels();
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [viewingModelId, setViewingModelId] = useState<string | null>(null);
  const handleEditModel = (model: any) => {
    navigate(`/model/edit/${model.id}`, { state: { model } });
  };

  return (
    <Row>
      {sample.map((item) => (
        <Col sm={12} md={6} lg={4} key={item.id} className="mb-5">
          <Card className="model-card">
            <Card.Body>
              <Card.Title>
                <div className="d-flex justify-content-between">
                  <div>{item.name}</div>
                  <div>
                    <Dropdown trigger={<IconDotsVertical />}>
                      <Dropdown.Item
                        className="DropdownMenuItem"
                        onClick={() => setViewingModelId(item.id)}
                      >
                        <IconEye />
                        View
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="DropdownMenuItem"
                        onClick={() => handleEditModel(item)}
                      >
                        <IconPencil />
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="DropdownMenuItem text-danger"
                        onClick={() => setSelectedModelId(item.id)}
                      >
                        <IconTrash />
                        Delete
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </div>
              </Card.Title>
              <div className="text-start mt-3">
                <CodeMirror
                  theme={vscodeDark}
                  editable={false}
                  readOnly
                  basicSetup={{
                    lineNumbers: false,
                    bracketMatching: true,
                    foldGutter: true,
                    syntaxHighlighting: true,
                  }}
                  extensions={[json()]}
                  height="250px"
                  maxHeight="250px"
                  value={transformData(item)}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
      {selectedModelId && (
        <DeleteModel
          id={selectedModelId}
          show={true}
          onHide={() => setSelectedModelId(null)}
        />
      )}
      {viewingModelId && (
        <ViewModel
          id={viewingModelId}
          show={true}
          onHide={() => setViewingModelId(null)}
        />
      )}
    </Row>
  );
};
