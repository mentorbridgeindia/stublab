export type FolderCardType =
  | "primary"
  | "secondary"
  | "warning"
  | "success"
  | "info"
  | "danger"
  | "light"
  | "dark"
  | "new";

export interface IFolderCardProps {
  type: FolderCardType;
  label: string;
  count: number;
  subLabel?: string;
  link: string;
  createdAt: string;
}
