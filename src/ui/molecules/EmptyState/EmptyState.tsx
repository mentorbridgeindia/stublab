import { ReactComponent as EmptyApiIcon } from "@icons/icon-empty-api.svg";
export const EmptyState = ({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) => {
  if (!title) {
    return <div>No results found</div>;
  }

  return (
    <div className="empty-state-icon">
      {icon ? icon : <EmptyApiIcon />}
      <p className="animated-text">
        {title.split("").map((char, index) => (
          <span key={index}>{char === " " ? "\u00A0" : char}</span>
        ))}
      </p>
    </div>
  );
};
