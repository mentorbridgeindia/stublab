import { Loader } from "@atoms/Loader";
import { useGetInit } from "@entities/Organization/useGetOrganization";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const AuthSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const accessToken = localStorage.getItem("accessToken");

  if(token !== null){
    localStorage.setItem('accessToken', token);
  }

  const { data, isLoading, error } = useGetInit();

  if (token === null && accessToken === null) {
    navigate(`/error/JWT_EXPIRED`);
  }

  useEffect(() => {
    if (isLoading) return;
    if (error) {
      navigate(`/error/SERVICE_ERROR`);
    } else {
      if (!data?.id) {
        navigate("/organization/create");
      } else {
        localStorage.setItem("clientId", data.id);
        navigate("/home");
      }
    }
  }, [data, navigate, isLoading, error]);

  return isLoading ? <Loader isLoading={isLoading} /> : <div />;
};
