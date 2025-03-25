import { ReactComponent as IconPlus } from "@icons/icon-plus.svg";
import { Button } from "react-bootstrap";

export const AddVariable = ({ append, isValid }: any) => {
  return (
    <div className="d-flex justify-content-start justify-content-between mb-3 ">
      <Button
        size="sm"
        variant="outline-primary"
        onClick={() =>
          isValid &&
          append({
            name: "",
            type: "string",
            isNullable: false,
            defaultValue: "",
            sampleText: "",
          })
        }
      >
        <IconPlus />
        Add Variable
      </Button>
    </div>
  );
};
