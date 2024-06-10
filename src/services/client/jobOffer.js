import { apiPrivate } from "../shared/axios";

export async function addJobOffer({
  id,
  title,
  images,
  description,
  client_price,
  craft_id,
  start_date,
  end_date,
  city,
}) {
  const data = {
    title,
    description,
    client_price,
    craft_id,
    start_date,
    end_date,
    city,
  };
  let response;
  const formData = new FormData();
  for (const x in data) if (data[x]) formData.append(x, data[x]);
  if (images?.length > 0)
    for (const image of images) formData.append("image[]", image);
  try {
    response = await apiPrivate.post(
      `/api/client/add_job_offer?client_id=${id}`,
      formData,
    );
    console.log(response);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function deleteJobOffer({ jobOfferId }) {
  console.log(jobOfferId);
  try {
    await apiPrivate.post(
      `/api/client/delete_job_offer?job_offer_id=${jobOfferId}`,
    );
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function acceptJobOffer({ handymanId, jobOfferId }) {
  console.log(handymanId, jobOfferId);
  try {
    await apiPrivate.post(
      `/api/client/add_job?craftsman_id=${handymanId}&job_offer_id=${jobOfferId}`,
    );
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getJobOffer({ jobOfferId }) {
  let response;
  try {
    response = await apiPrivate.post(
      `/api/client/get_job_offer?job_offer_id=${jobOfferId}`,
    );
    const data = response.data.data[0];
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function getJobOfferReplies({ jobOfferId, pageSize, page }) {
  let response;
  try {
    response = await apiPrivate.post(
      `/api/client/get_job_offer_replies?job_offer_id=${jobOfferId}&pagination=${pageSize}&page=${page}`,
    );
    const data = response.data.data;
    console.log({
      data: data.replies.data,
      latestPage: data.replies.last_page,
      title: data.job_offer_title,
    });
    return {
      data: data.replies.data,
      latestPage: data.replies.last_page,
      title: data.job_offer_title,
    };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function getAllJobOffers({ id, page, pageSize }) {
  let response;
  try {
    response = await apiPrivate.post(
      `/api/client/get_client_job_offers?client_id=${id}&pagination=${pageSize}&page=${page}`,
    );
    const data = response.data.data;
    return { data: data.data, latestPage: data.last_page };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
