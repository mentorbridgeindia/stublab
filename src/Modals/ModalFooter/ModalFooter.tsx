import React from 'react';
import { Button } from 'react-bootstrap';

interface ModalFooterProps {
  onCancel: () => void;
  onOkay: () => void;
  isOkayDisabled?: boolean;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onCancel, onOkay, isOkayDisabled = false }) => {
  return (
    <div className="d-flex justify-content-center mb-4">
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onOkay} disabled={isOkayDisabled} className="ms-2">
        Submit
      </Button>
    </div>
  );
};

export default ModalFooter;
