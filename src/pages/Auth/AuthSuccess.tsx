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
    if (!isLoading && !data?.id) {
      navigate("/organization/create");
    } else if (data?.id) {
      debugger;
      localStorage.setItem("clientId", data.id);
      // 67b9936a9a3e9a782d63c27d
      navigate("/home");
    }
  }, [data, navigate, isLoading]);

  if (!token && accessToken === null) {
    navigate("/auth/error");
  }

  localStorage.setItem("accessToken", token ?? "");

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return <div></div>;
};
