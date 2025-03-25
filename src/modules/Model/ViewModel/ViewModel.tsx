import { ModelTypes } from "@/types";
import { json } from "@codemirror/lang-json";
import { useGetModelById } from "@entities/Model";
import { ReactComponent as IconCheck } from "@icons/icon-check.svg";
import { ReactComponent as IconCross } from "@icons/icon-cross.svg";
import { Drawer } from "@organisms/Drawer";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { Badge } from "react-bootstrap";
import { transformData } from "./helpers";
import "./ViewModel.scss";
import { IViewModelProps } from "./ViewModel.types";

export const ViewModel = ({ id, show, onHide }: IViewModelProps) => {
  const { data: model, isLoading } = useGetModelById(id, !!id);

  const renderVariableType = (type: ModelTypes) => {
    if (typeof type === "string") {
      switch (type) {
        case "string":
          return <Badge className="type-badge type-string">string</Badge>;
        case "number":
          return <Badge className="type-badge type-number">number</Badge>;
        case "boolean":
          return <Badge className="type-badge type-boolean">boolean</Badge>;
        default:
          return <Badge className="type-badge type-default">{type}</Badge>;
      }
    }
    return <Badge className="type-badge type-model">{type.modelName}</Badge>;
  };

  const getCode = () => {
    return model
      ? JSON.parse(JSON.stringify(transformData(model), null, 2))
      : "";
  };

  return (
    <Drawer show={show} onHide={onHide} title={model?.modelName ?? "Model"}>
      {model && (
        <div className="model-viewer">
          <div className="model-header">
            <h2 className="model-title">{model.modelName}</h2>
            <div className="model-meta">
              <span className="meta-item">
                <span className="meta-label">Variables:</span>
                <span className="meta-value">{model.variables?.length}</span>
              </span>
            </div>
          </div>

          <div className="variables-section">
            <h3 className="section-title">Variables</h3>
            <div className="variables-grid">
              {model?.variables?.map((variable) => (
                <div key={variable.id} className="variable-card">
                  <div className="variable-header">
                    <h4 className="variable-name">{variable.name}</h4>
                    {renderVariableType(variable.type)}
                  </div>

                  <div className="variable-details">
                    <div className="detail-item">
                      <span className="detail-label">Nullable</span>
                      <span
                        className={`detail-value ${
                          variable.isNullable ? "success" : "danger"
                        }`}
                      >
                        {variable.isNullable ? <IconCheck /> : <IconCross />}
                      </span>
                    </div>

                    {variable.defaultValue && (
                      <div className="detail-item">
                        <span className="detail-label">Default</span>
                        <span className="detail-value">
                          {variable.defaultValue}
                        </span>
                      </div>
                    )}

                    {variable.sampleText && (
                      <div className="detail-item">
                        <span className="detail-label">Sample</span>
                        <span className="detail-value">
                          {variable.sampleText}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="preview-section">
            <h3 className="section-title">JSON Preview</h3>
            <div className="preview-container">
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
                maxHeight="400px"
                value={!isLoading && model ? getCode() : ""}
                className="code-preview"
              />
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};
