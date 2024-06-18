import { apiPrivate } from "../shared/axios";

export async function getSpecialImg({ id }) {
  let response;
  try {
    response = await apiPrivate.post(
      `/api/craftsman/get_search_images?craftsman_id=${id}`,
    );
    const data = await response.data;
    return data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function addSpecialImg({ id, images }) {
  const formData = new FormData();
  if (images?.length > 0)
    for (const image of images) formData.append("image[]", image.img);
  let response;
  try {
    response = await apiPrivate.post(
      `/api/craftsman/add_search_images?craftsman_id=${id}`,
      formData,
    );
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteSpecialImg({ imgId, handymanId }) {
  try {
    await apiPrivate.post(
      `/api/craftsman/delete_search_image?craftsman_id=${handymanId}&image_id=${imgId}`,
    );
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
