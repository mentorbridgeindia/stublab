import api from "../api";

export async function fetchData<T>(url: string): Promise<T> {
  console.log("url", url);
  const response = await api.get<T>(url);
  return response.data;
}
