export interface IFormActionButtons {
  primaryLabel: string;
  secondaryLabel: string;
  onCancel: () => void;
  onSubmit: () => void;
  isPrimaryDisabled?: boolean;
  isPrimaryDelete?: boolean;
}
