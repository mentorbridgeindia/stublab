import { ReactComponent as IconPlus } from "@icons/icon-plus.svg";
import { Button } from "react-bootstrap";

export const AddVariable = ({ append }: any) => {
  return (
    <div className="d-flex justify-content-start justify-content-between mb-3 ">
      <Button
        size="sm"
        variant="outline-primary"
        onClick={() =>
          append({
            name: "",
            type: "",
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
