import { api } from "./axios";

export async function getAllCrafts() {
  let response;
  try {
    response = await api.post(`/api/get_crafts`);
    const data = response.data;
    return data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
