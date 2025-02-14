import { Loader } from "@atoms/Loader";
import { useGetInit } from "@entities/Organization/useGetOrganization";
import { useNavigate, useSearchParams } from "react-router-dom";

export const AuthSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const accessToken = sessionStorage.getItem("accessToken");
  if (!token && accessToken === null) {
    navigate("/auth/error");
  }

  sessionStorage.setItem("accessToken", token ?? "");

  const { data, isLoading } = useGetInit();

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (!data) {
    navigate("/organization/create");
  } else {
    sessionStorage.setItem("clientId", data.id);
    navigate("/home");
  }

  return <div></div>;
};
