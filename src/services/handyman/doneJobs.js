import { apiPrivate } from "../shared/axios";

export async function getAllDoneJobs({ id, pageSize, page }) {
  let response;
  try {
    response = await apiPrivate.post(
      `api/craftsman/get_done_jobs?craftsman_id=${id}&pagination=${pageSize}&page=${page}`,
    );
    const data = await response.data.data;
    return {
      currentPage: data.current_page,
      latestPage: data.last_page,
      data: data.data,
    };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function getDoneJob({ jobId }) {
  let response;
  try {
    response = await apiPrivate.post(
      `api/craftsman/get_done_job?done_job_id=${jobId}`,
    );
    const data = await response.data.data;
    return data[0];
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
