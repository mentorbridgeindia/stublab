import { formatDate } from "@/utils/date-utils";
import React from "react";
import { Link } from "react-router-dom";
import "./FolderCard.scss";
import { IFolderCardProps } from "./FolderCard.types";

export const FolderCard: React.FC<IFolderCardProps> = ({
  type = "success",
  label,
  count,
  subLabel,
  link,
  createdAt,
}) => {
  return (
    <div className={`folder-card type-${type}`}>
      <div className="folder-content">
        <div className="folder-header">
          <div className="folder-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M21 7L13 2L5 7M21 17L13 22L5 17M21 12L13 17L5 12M13 12L13 2M13 22L13 17"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="folder-badge">
            {count} <span>API's</span>
          </div>
        </div>

        <div className="folder-body">
          <Link to={link} className="folder-title">
            {label}
          </Link>
          {subLabel && <div className="folder-subtitle">{subLabel}</div>}
        </div>

        <div className="folder-footer">
          <div className="folder-stats">
            <div className="stat-item">
              <span className="stat-label">Created At</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">{formatDate(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
