import { ModelTypes } from "@/types";
import { json } from "@codemirror/lang-json";
import { useGetModelById } from "@entities/Model";
import { ReactComponent as IconCheck } from "@icons/icon-check.svg";
import { ReactComponent as IconCross } from "@icons/icon-cross.svg";
import { Drawer } from "@organisms/Drawer";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { Badge, Card, Table } from "react-bootstrap";
import { IViewModelProps } from "./ViewModel.types";
import { transformData } from "./helpers";

export const ViewModel = ({ id, show, onHide }: IViewModelProps) => {
  const { data: model, isLoading } = useGetModelById(id, {
    queryConfig: {
      enabled: !!id,
    },
  });

  const renderVariableType = (type: ModelTypes) => {
    if (typeof type === "string") {
      switch (type) {
        case "string":
          return (
            <Badge bg="primary" className="small">
              string
            </Badge>
          );
        case "number":
          return (
            <Badge bg="dark" className="small">
              number
            </Badge>
          );
        case "boolean":
          return (
            <Badge bg="danger" className="small">
              boolean
            </Badge>
          );
        default:
          return (
            <Badge bg="primary" className="small">
              {type}
            </Badge>
          );
      }
    }
    return (
      <Badge bg="secondary" className="small">
        {type.modelName}
      </Badge>
    );
  };

  const getCode = () => {
    return model
      ? JSON.parse(JSON.stringify(transformData(model), null, 2))
      : "";
  };

  return (
    <Drawer show={show} onHide={onHide} title={model?.modelName ?? "Model"}>
      {model && (
        <div>
          <Table responsive className="mb-5">
            <thead className="bg-secondary">
              <tr>
                <th>Variable</th>
                <th>Type</th>
                <th className="text-center">Nullable</th>
                <th className="text-center">Default Value</th>
                <th className="text-center">Sample Text</th>
              </tr>
            </thead>
            <tbody>
              {model?.variables?.map((variable) => (
                <tr key={variable.id}>
                  <td>
                    <p className="mb-0 small">{variable.name}</p>
                  </td>
                  <td>{renderVariableType(variable.type)}</td>
                  <td>
                    <p
                      className={`text-center icon-md mb-0 ${
                        variable.isNullable ? "text-success" : "text-danger"
                      }`}
                    >
                      {variable.isNullable ? <IconCheck /> : <IconCross />}
                    </p>
                  </td>
                  <td className="text-center">{variable.defaultValue}</td>
                  <td className="text-center">{variable.sampleText}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="mt-5">
            <Card bg="light">
              <Card.Header>
                <Card.Title>Preview</Card.Title>
              </Card.Header>
              <Card.Body>
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
                  maxHeight="400px"
                  value={!isLoading && model ? getCode() : ""}
                />
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </Drawer>
  );
};
