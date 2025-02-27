import { useDeleteModelById } from "@entities/Model";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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
      toast.success("Model deleted successfully!");
      onHide();
      navigate("/model");
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

  const handleDelete = (id: string) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete model ${id.toUpperCase()}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            console.log(`${id.toUpperCase()} Deleted Successfully`);
            deleteModel(id);
          },
          style: { backgroundColor: "green", color: "white", border: "none" },
        },
        {
          label: "No",
          onClick: () => {
            console.log(`${id.toUpperCase()} Deletion Canceled`);
          },
          style: { backgroundColor: "red", color: "white", border: "none" },
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  useEffect(() => {
    if (show) {
      handleDelete(id);
    }
  }, [show]);

  return null; 
};
