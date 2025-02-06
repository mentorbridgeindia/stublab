import { ReactComponent as IconBan } from "@icons/icon-ban.svg";
import { ReactComponent as IconCheck } from "@icons/icon-check.svg";
import { ReactComponent as IconTrash } from "@icons/icon-trash.svg";
import { Button } from "react-bootstrap";
import "./FormActionButtons.scss";
import { IFormActionButtons } from "./FormActionButtons.types";

export const FormActionButtons = (props: IFormActionButtons) => {
  const {
    primaryLabel,
    secondaryLabel,
    onCancel,
    onSubmit,
    isPrimaryDisabled,
    isPrimaryDelete,
  } = props;

  return (
    <div className="form-action">
      <Button
        type="button"
        variant="outline-secondary"
        onClick={onCancel}
        size="sm"
      >
        <IconBan />
        {secondaryLabel}
      </Button>
      <Button
        type="submit"
        size="sm"
        variant={isPrimaryDelete ? "danger" : "primary"}
        disabled={isPrimaryDisabled}
        onClick={onSubmit}
        
      >
        {isPrimaryDelete ? <IconTrash /> : <IconCheck />}
        {primaryLabel}
      </Button>
    </div>
  );
};
