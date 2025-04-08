import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  // TODO: Add home page and check if JWT is available

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/error/JWT_EXPIRED");
    }
  }, []);

  return <div>Home</div>;
};
