import { ReactComponent as IconDotsVertical } from "@icons/icon-dots-vertical.svg";
import { ReactComponent as IconEye } from "@icons/icon-eye.svg";
import { ReactComponent as IconPencil } from "@icons/icon-pencil.svg";
import { ReactComponent as IconPlus } from "@icons/icon-plus.svg";
import { ReactComponent as IconTrash } from "@icons/icon-trash.svg";
import { Dropdown } from "@molecules/Dropdown/Dropdown";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./model-card.scss";
import { sample } from "./sample";

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
      <div className="mt-5">
        <Row>
          {sample.map((item, index) => (
            <Col sm={12} md={6} lg={4} key={index} className="mb-5">
              <Card className="model-card">
                <Card.Body>
                  <Card.Title>
                    <div className="d-flex justify-content-between">
                      <div>{item.name}</div>
                      <div>
                        <Dropdown trigger={<IconDotsVertical />}>
                          <Dropdown.Item className="DropdownMenuItem">
                            <IconEye />
                            View
                          </Dropdown.Item>
                          <Dropdown.Item className="DropdownMenuItem">
                            <IconPencil />
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item className="DropdownMenuItem text-danger">
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
                      }}
                      height="250px"
                      maxHeight="250px"
                      value={item.code}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
