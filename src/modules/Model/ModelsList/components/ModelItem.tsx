import { IModelEntity } from "@/entities/Model";
import { json } from "@codemirror/lang-json";
import { ReactComponent as IconDotsVertical } from "@icons/icon-dots-vertical.svg";
import { ReactComponent as IconEye } from "@icons/icon-eye.svg";
import { ReactComponent as IconPencil } from "@icons/icon-pencil.svg";
import { ReactComponent as IconTrash } from "@icons/icon-trash.svg";
import { Dropdown } from "@molecules/Dropdown/Dropdown";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { Card, Col } from "react-bootstrap";
import { useTransformData } from "../../ViewModel/useTransformData";

export const ModelItem = ({
  item,
  setViewingModelId,
  handleEditModel,
  setSelectedModelId,
}: {
  item: IModelEntity;
  setViewingModelId: (id: string) => void;
  handleEditModel: (model: IModelEntity) => void;
  setSelectedModelId: (id: string) => void;
}) => {
  const { transformedData } = useTransformData(item);
  return (
    <Col sm={12} md={6} lg={4} key={item.id}>
      <Card className="model-card">
        <div className="model-card-header">
          <div className="model-info">
            <div className="model-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M21 7L13 2L5 7M21 17L13 22L5 17M21 12L13 17L5 12M13 12L13 2M13 22L13 17"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="model-name">{item.modelName}</h3>
          </div>
          <Dropdown
            trigger={<IconDotsVertical className="action-icon" />}
            className="model-actions"
          >
            <Dropdown.Item
              className="action-item"
              onClick={() => setViewingModelId(item.id)}
            >
              <IconEye />
              <span>View Model</span>
            </Dropdown.Item>
            <Dropdown.Item
              className="action-item"
              onClick={() => handleEditModel(item)}
            >
              <IconPencil />
              <span>Edit Model</span>
            </Dropdown.Item>
            <Dropdown.Item
              className="action-item delete"
              onClick={() => setSelectedModelId(item.id)}
            >
              <IconTrash />
              <span>Delete Model</span>
            </Dropdown.Item>
          </Dropdown>
        </div>

        <div className="model-preview">
          <div className="code-mirror-wrapper">
            <CodeMirror
              theme={vscodeDark}
              editable={false}
              readOnly
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                dropCursor: true,
                crosshairCursor: true,
                highlightActiveLineGutter: true,
                highlightSpecialChars: true,
                syntaxHighlighting: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: false,
                rectangularSelection: false,
                indentOnInput: true,
                highlightActiveLine: true,
              }}
              extensions={[json()]}
              height="300px"
              maxHeight="300px"
              value={transformedData ?? ""}
            />
          </div>
        </div>
      </Card>
    </Col>
  );
};
