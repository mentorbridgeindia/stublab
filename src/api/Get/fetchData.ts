import api from "../api";

export async function fetchData<T>(url: string): Promise<T> {
  console.log("url", url);
  try {
    const response = await api.get<T>(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data", { error });
    throw new Error(`Error fetching data from ${url}: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
