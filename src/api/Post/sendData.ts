import api from "../api";
export const sendData = async <T>(
  url: string,
  body: unknown
): Promise<T | null> => {
  try {
    const response = await api.post<T>(url, body);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    throw new Error(response.status.toString() + ":" + response.data);
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};
