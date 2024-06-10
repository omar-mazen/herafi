import { apiPrivate } from "../shared/axios";

export async function getAllNewJobs({ cities, craft, pageSize, page }) {
  let url = `api/client/get_job_offers_by_city_craft?pagination=${pageSize}&page=${page}&craft=${craft}`;
  for (const city of cities) url = `${url}&city[]=${city.city}`;
  let response;
  try {
    response = await apiPrivate.post(url);
    const data = await response.data.data;
    console.log(response);
    return {
      currentPage: data.jobOffers.current_page,
      latestPage: data.jobOffers.last_page,
      data: data.jobOffers.data,
    };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function getAciveJob({ jobId }) {
  let response;
  try {
    response = await apiPrivate.post(
      `api/client/get_job_offer?job_offer_id${jobId}`,
    );
    const data = await response.data.data;
    return data[0];
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
