import { FolderCardType } from "@molecules/FolderCard";

export const assignType = (apiCount: number): FolderCardType => {
  const typeMap: Record<string, number> = {
    danger: 0,
    primary: 5,
    secondary: 10,
    warning: 15,
    info: 20,
    light: 25,
    dark: 30,
    success: 35,
    new: 36,
  };

  return (Object.keys(typeMap).find((type) => apiCount < typeMap[type]) ??
    "new") as FolderCardType;
};
