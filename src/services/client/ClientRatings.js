import { apiPrivate } from "../shared/axios";

export async function getAllClientRatings({ id, pageSize, page }) {
  let response;
  try {
    response = await apiPrivate.post(
      `api/client/get_all_client_ratings?client_id=${id}&pagination=${pageSize}&page=${page}`,
    );
    const data = await response.data.data;
    console.log(response);
    return {
      currentPage: data.current_page,
      latestPage: data.last_page,
      data: data.data,
    };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
