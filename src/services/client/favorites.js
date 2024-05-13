import { apiPrivate } from "../shared/axios";

export async function getFavoriteList({ clientId, listId, pageSize, page }) {
  let response;
  try {
    response = await apiPrivate.post(
      `/api/client/get_FavoriteList?client_id=${clientId}&list_id=${listId}&pagination=${pageSize}&page=${page}`,
    );
    const data = await response.data;
    return data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function addFavoriteList({ id, title, description }) {
  let response;
  try {
    response = await apiPrivate.post(
      `/api/client/add_a_favorite?client_id=${id}`,
      { title, description },
    );
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function deleteFavoriteList({ listId }) {
  let response;
  try {
    response = await apiPrivate.post(
      `/api/client/delete_a_favorite?list_id=${listId}`,
    );
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function getAllFavoriteLists({ clientId }) {
  let response;
  try {
    response = await apiPrivate.post(
      `/api/client/get_favorites?client_id=${clientId}`,
    );
    const data = await response.data;
    return data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function addHandymanToFavoriteList({
  clientId,
  listId,
  handymanId,
}) {
  let response;
  try {
    response = await apiPrivate.post(
      `/api/client/add_to_FavoriteList?client_id=${clientId}&craftsman_id=${handymanId}&list_id=${listId}`,
    );
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function deleteHandymanFromFavoriteList({
  clientId,
  listId,
  handymanId,
}) {
  let response;
  try {
    response = await apiPrivate.post(
      `/api/client/delete_from_FavoriteList?client_id=${clientId}&craftsman_id=${handymanId}&list_id=${listId}`,
    );
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
