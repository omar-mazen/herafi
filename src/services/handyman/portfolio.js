import { apiPrivate } from "../shared/axios";

export async function addToPortfolio({ id, title, description, images }) {
  let response;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  for (const image of images) formData.append("image[]", image);
  try {
    response = await apiPrivate.post(
      `api/craftsman/portfolio?craftsman_id=${id}`,
      formData,
    );
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function getHandymanPortfolio({ id, page = 1, pageSize = 5 }) {
  let response;
  try {
    response = await apiPrivate.post(
      `/api/craftsman/get_portfolio?craftsman_id=${id}&pagination=${pageSize}&page=${page}`,
    );
    const data = await response.data.data;
    return {
      currentPage: data.current_page,
      latestPage: data.last_page,
      portfolio: data.data,
    };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
