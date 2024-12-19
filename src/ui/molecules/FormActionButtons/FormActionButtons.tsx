import { ReactComponent as IconBan } from "@icons/icon-ban.svg";
import { ReactComponent as IconCheck } from "@icons/icon-check.svg";
import { Button } from "react-bootstrap";
import "./FormActionButtons.scss";
import { IFormActionButtons } from "./FormActionButtons.types";

const FormAction = (props: IFormActionButtons) => {
  const {
    isPrimaryDisabled,
    primaryLabel,
    secondaryLabel,
    onCancel,
    onSubmit,
  } = props;

  return (
    <div className="form-action">
      <Button type="button" variant="outline-secondary" onClick={onCancel}>
        <IconBan />
        {secondaryLabel}
      </Button>
      <Button type="submit" disabled={isPrimaryDisabled} onClick={onSubmit}>
        <IconCheck />
        {primaryLabel}
      </Button>
    </div>
  );
};


export default FormAction;