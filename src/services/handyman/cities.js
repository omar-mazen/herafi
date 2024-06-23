import { apiPrivate } from "../shared/axios";

export async function addCities({ id, cities }) {
  console.log(cities);
  let response;
  const formData = new FormData();
  for (const city of cities) formData.append("city[]", city);
  try {
    response = await apiPrivate.post(
      `/api/craftsman/add_city?craftsman_id=${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    console.log(response);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
export async function updateCities({ id, cities }) {
  let response;
  const formData = new FormData();
  for (const city of cities) formData.append("city[]", city);
  try {
    response = await apiPrivate.post(
      `/api/craftsman/update_city?craftsman_id=${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    console.log(response);
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
