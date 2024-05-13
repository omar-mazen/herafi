import { apiPrivate } from "../shared/axios";

export async function getHandymanWorkHistory({ id, pagination = 5, page = 1 }) {
  let response;
  try {
    response = await apiPrivate.post(
      `/api/craftsman/get_done_jobs?craftsman_id=${id}&pagination=${pagination}&page=${page}`,
    );
    const data = await response.data.data;
    return {
      currentPage: data.current_page,
      latestPage: data.last_page,
      workHistory: data.data,
    };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
