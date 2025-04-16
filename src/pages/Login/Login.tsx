import { useEffect } from "react";

export const LoginPage = () => {
  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("clientId");
    // window.location.href = "https://stublab.securosphere.in/login";
  }, []);

  return <></>;
};
