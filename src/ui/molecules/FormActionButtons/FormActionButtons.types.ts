import { MouseEvent } from "react";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

export interface IFormActionButtons {
  primaryLabel: string;
  secondaryLabel: string;
  onCancel: () => void;
  onSubmit: (data: any) => void; 
  isPrimaryDisabled?: boolean;
  isPrimaryDelete?: boolean;
  handleSubmit?: UseFormHandleSubmit<FieldValues>; 
}
