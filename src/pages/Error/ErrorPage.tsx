import { useNavigate } from "react-router-dom";
import { ReactComponent as BrokenLinkIcon } from "../../assets/icons/icon-broken-link.svg";
import { ReactComponent as GenericErrorIcon } from "../../assets/icons/icon-generic-error.svg";
import { ReactComponent as SessionExpiredIcon } from "../../assets/icons/icon-session-expired.svg";
import { Button } from "react-bootstrap";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (accessToken) {
      navigate("/home");
    } else {
      window.location.href = "https://stublab.securopshere.in/login";
    }
  };

  const accessToken = localStorage.getItem("accessToken");

  let errorType = window.location.pathname.startsWith("/error")
    ? "ERROR"
    : "BROKEN_LINK";

  if (accessToken) {
    errorType = "JWT_EXPIRED";
  }

  const renderErrorIcon = () => {
    if (errorType === "ERROR") {
      return <GenericErrorIcon />;
    } else if (errorType === "BROKEN_LINK") {
      return <BrokenLinkIcon />;
    } else if (errorType === "JWT_EXPIRED") {
      return <SessionExpiredIcon />;
    }
  };

  const renderHeading = () => {
    if (errorType === "ERROR") {
      return "Oops! Something Went Wrong";
    } else if (errorType === "BROKEN_LINK") {
      return "Oh no..a broken link";
    } else if (errorType === "JWT_EXPIRED") {
      return "Session Expired";
    }
  };

  const renderSubHeading = () => {
    if (errorType === "ERROR") {
      return "You didn’t break the internet, but we can’t find what are you looking for.";
    } else if (errorType === "BROKEN_LINK") {
      return "The page you were looking for seems to have gone missing.";
    } else if (errorType === "JWT_EXPIRED") {
      return "Your current session has been expired. Please click on the button below to log in again.";
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 error-page">
      <div className="flex flex-col items-center justify-center">
        {renderErrorIcon()}
        <div className="text-center p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-red-600">{renderHeading()}</h2>
          <p className="text-gray-800 mt-4">{renderSubHeading()}</p>
          <div className="d-flex justify-content-center">
            <Button onClick={handleButtonClick}>
              {accessToken ? "Try again" : "Log in"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
