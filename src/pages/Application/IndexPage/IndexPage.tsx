import { ReactComponent as IconPlus } from "@icons/icon-plus.svg";
import { CreateApplication } from "@modules/Application/CreateApplication";
import { useState } from "react";
import { Button } from "react-bootstrap";

export const ApplicationIndexPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button onClick={() => setShow(true)}>
          <IconPlus />
          Create Application
        </Button>
      </div>
      <CreateApplication
        show={show}
        handleClose={handleClose}
        handleSubmit={() => {}}
      />
    </div>
  );
};
