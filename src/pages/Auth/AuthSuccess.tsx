import { Loader } from "@atoms/Loader";
import { useGetInit } from "@entities/Organization/useGetOrganization";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const AuthSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);
  const accessToken = localStorage.getItem("accessToken");

  const { data, isLoading } = useGetInit();

  useEffect(() => {
    if (!data?.id) {
      navigate("/organization/create");
    } else {
      localStorage.setItem("clientId", data.id);
      navigate("/home");
    }
  }, [data, navigate]);

  if (!token && accessToken === null) {
    navigate("/auth/error");
  }

  localStorage.setItem("accessToken", token ?? "");

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return <div></div>;
};
