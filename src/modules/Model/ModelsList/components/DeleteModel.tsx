import { Loader } from "@atoms/Loader";
import { useDeleteModelById } from "@entities/Model";
import { FormActionButtons } from "@molecules/FormActionButtons";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const DeleteModel = ({
  id,
  show,
  onHide,
}: {
  id: string;
  show: boolean;
  onHide: () => void;
}) => {
  const navigate = useNavigate();

  const { mutate: deleteModel, isPending, isSuccess } = useDeleteModelById(id, {
    onSuccess: () => {
      toast.success("Model data deleted successfully!");
      onHide(); 
      navigate("/models"); 
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  useEffect(() => {
    if (isSuccess) {
      onHide();
    }
  }, [isSuccess, onHide]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Model</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this model?</p>
        {isPending && <Loader isLoading={isPending} />}
      </Modal.Body>
      <Modal.Footer>
        <FormActionButtons
          onCancel={onHide}
          onSubmit={() => deleteModel(id)} 
          primaryLabel="Delete"
          secondaryLabel="Cancel"
          isPrimaryDelete
        />
      </Modal.Footer>
    </Modal>
  );
};
