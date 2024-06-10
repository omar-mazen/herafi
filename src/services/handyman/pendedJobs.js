import { apiPrivate } from "../shared/axios";

export async function getAllPendedJobs({ id, pageSize, page }) {
  let response;
  try {
    response = await apiPrivate.post(
      `/api/craftsman/get_pending_jobs?craftsman_id=${id}&pagination=${pageSize}&page=${page}`,
    );
    const data = await response.data.data;
    return {
      latestPage: data?.last_page,
      data: data.data,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
export async function getPendedJob({ jobId }) {
  let response;
  try {
    response = await apiPrivate.post(
      `/api/craftsman/get_one_pending_job?pending_job_id=${jobId}`,
    );
    const data = await response.data.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
