import { api } from "./axios";

export async function getHomeStats() {
  let response;
  try {
    response = await api.post("/api/home");
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
