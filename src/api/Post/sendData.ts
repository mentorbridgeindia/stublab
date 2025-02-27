import api from "../api";

export const sendData = async <T>(
  url: string,
  body: unknown
): Promise<T | null> => {
  const response = await api.post<T>(url, body);

  if (response.status === 406) {
    throw new Error("SUBDOMAIN_NOT_AVAILABLE");
  }

  if (response.status === 200 || response.status === 201) {
    return response.data;
  }

  console.error("Error sending data:", response.data);
  throw new Error(`${response.status}: ${response.data}`);
};
