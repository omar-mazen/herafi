import { apiPrivate } from "../shared/axios";

export async function getProfitChart({ id }) {
  let response;
  try {
    response = await apiPrivate.post(`api/craftsman/chart?craftsman_id=${id}`);
    const data = await response.data;
    console.log(response);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
