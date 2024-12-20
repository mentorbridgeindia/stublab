import { PropsWithChildren } from "react";

export interface IDrawer extends PropsWithChildren {
  show: boolean;
  onHide: () => void;
  title: string;
}

