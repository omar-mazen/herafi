import { apiPrivate } from "../shared/axios";

export async function getAllAciveJobs({ id, pageSize, page }) {
  let response;
  try {
    response = await apiPrivate.post(
      `api/craftsman/get_jobs?craftsman_id=${id}&pagination=${pageSize}&page=${page}`,
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
export async function getAciveJob({ jobId }) {
  let response;
  try {
    response = await apiPrivate.post(`api/craftsman/get_job?job_id=${jobId}`);
    console.log(response);
    const data = await response.data.data;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
