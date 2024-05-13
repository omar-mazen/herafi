import { apiPrivate } from "../shared/axios";

export async function giveOffer({
  handymanId,
  jobOfferId,
  type_of_pricing,
  offered_price,
  description,
}) {
  let response;
  const formData = new FormData();
  formData.append("type_of_pricing", type_of_pricing);
  formData.append("offered_price", offered_price);
  formData.append("description", description);
  console.log(
    handymanId,
    jobOfferId,
    type_of_pricing,
    offered_price,
    description,
  );
  try {
    response = await apiPrivate.post(
      `api/craftsman/add_job_offer_reply?craftsman_id=${handymanId}&job_offer_id=${jobOfferId}`,
      formData,
    );
    console.log(response);
    const data = await response.data.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
