import { Loader } from "@atoms/Loader";
import { useDeleteModelById } from "@entities/Model";
import { FormActionButtons } from "@molecules/FormActionButtons";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export const DeleteModel = ({
  id,
  show,
  onHide,
}: {
  id: string;
  show: boolean;
  onHide: () => void;
}) => {
  const handleError = (error: any) => {
    console.log(error);
  };

  const { mutate: deleteModel, isPending } = useDeleteModelById(id, {
    onSuccess: (res) => {
      if (res.status === 201) {
        toast.success("Model data deleted successfully!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
    onError: (error) => handleError(error),
  });

  if (isPending) {
    return <Loader isLoading={isPending} />;
  }

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
