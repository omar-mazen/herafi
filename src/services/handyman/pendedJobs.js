import { apiPrivate } from "../shared/axios";

export async function getAllPendedJobs({ id, pageSize, page }) {
  let response;
  try {
    response = await apiPrivate.post(
      `api/craftsman/get_pending_jobs?craftsman_id=${id}&pagination=${pageSize}&page=${page}`,
    );
    const data = await response.data.data;
    return {
      // currentPage: data?.current_page,
      // latestPage: data?.last_page,
      latestPage: 1,
      data: data.reduce((prev, curr) => [...prev, curr[0]], []),
    };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
