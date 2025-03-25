import { PropsWithChildren } from "react";

export interface IDropdown extends PropsWithChildren {
  trigger: React.ReactNode;
  className?: string;
}
