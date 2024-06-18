import { apiPrivate } from "../shared/axios";

export async function getAllClientAciveJobs({ id, pageSize, page }) {
  let response;
  try {
    response = await apiPrivate.post(
      `/api/client/get_active_jobs?client_id=${id}&pagination=${pageSize}&page=${page}`,
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
export async function ClientFinishJob({
  handymanId,
  jobId,
  rating,
  comment,
  images,
}) {
  let formData = new FormData();
  formData.append("rating", rating);
  formData.append("comment", comment);
  if (images.length > 0)
    for (const image of images) formData.append("image[]", image);
  let response;
  try {
    response = await apiPrivate.post(
      `/api/client/finish_job?client_id=${handymanId}&active_job_id=${jobId}`,
      { rating, comment },
    );
    console.log(response);
    const data = await response.data.data;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
