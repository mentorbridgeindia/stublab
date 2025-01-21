import React from "react";
import "./FolderCard.scss";
import { IFolderCardProps } from "./FolderCard.types";

export const FolderCard: React.FC<IFolderCardProps> = ({
  type,
  label,
  count,
  subLabel,
}) => {
  return (
    <div className={`folder type-${type}`}>
      <div className="dots"></div>
      <div className="scratches"></div>
      <div className="doc-container">
        <div className="doc">
          <div className="row">
            <div className="placeholder"></div>
            <div className="placeholder"></div>
          </div>
          <div className="row">
            <div className="placeholder"></div>
          </div>
        </div>
      </div>
      <div className="fg-container">
        <div className="fg-1"></div>
        <div className="fg-2"></div>
        <div className="fg">
          <div className="folder-label">{label}</div>
          {subLabel && <div className="folder-sub-label">{subLabel}</div>}
          <div className="folder-count">
            {count} <span>API&apos;s</span>
          </div>
        </div>
      </div>
    </div>
  );
};
