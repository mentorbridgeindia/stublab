import api from "../api";
export const deleteData = async <T>(url: string) => {
  const response = await api.delete<T>(url);
  return response.data;
};
