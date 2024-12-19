import { ReactComponent as IconTrash } from "@icons/icon-trash.svg";
import { Button } from "react-bootstrap";

export const RemoveVariable = ({ remove, index }: any) => {
  return (
    <Button variant="danger" onClick={() => remove(index)}>
      <IconTrash />
    </Button>
  );
};
