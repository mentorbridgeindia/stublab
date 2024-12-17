import React from "react";
import FormAction from "@molecules/FormActionButtons"; 

interface ModalFooterProps {
  onCancel: () => void;
  onOkay: () => void;
  isOkayDisabled?: boolean;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  onCancel,
  onOkay,
  isOkayDisabled = false,
}) => {
  return (
    // <FormAction
    //   primaryLabel="Submit"
    //   secondaryLabel="Cancel"
    //   onCancel={onCancel}
    //   onSubmit={onOkay}
    //   isPrimaryDisabled={isOkayDisabled}
    // />
    <FormAction
    isPrimaryDisabled={false}
    primaryLabel="Submit"
    secondaryLabel="Cancel"
    onCancel={onCancel}
    onSubmit={onOkay}
  />
  );
};

export default ModalFooter;
