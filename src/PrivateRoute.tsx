import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("accessToken");
  const isClientId = localStorage.getItem("clientId");

  if (!isAuthenticated || !isClientId) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
