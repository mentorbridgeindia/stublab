import api from "../api";
export const fetchData = async <T>(url: string) => {
  const result = await api.get<T>(url);
  return result.data;
};
