import { ReactNode } from "react";
import "./AnimatedCard.scss";

export const AnimatedCard = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="animated-card">
      <div className="animated-card-bg">{children}</div>
      <div className="animated-card-blob"></div>
    </div>
  );
};

export default AnimatedCard;
