import { apiPrivate } from "../shared/axios";

export async function addPhones({ id, phones, whatsapp }) {
  let response;
  const formData = new FormData();
  for (const phone of phones) formData.append("phone[]", phone);
  if (whatsapp.length > 0)
    for (const wh of whatsapp) formData.append("whatsapp[]", wh);
  try {
    response = await apiPrivate.post(
      `/api/craftsman/add_phone?craftsman_id=${id}`,

      formData,

      { headers: { "Content-Type": "multipart/form-data" } },
    );
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function updatePhones({ id, phones, whatsapp }) {
  console.log(phones, whatsapp);
  let response;
  const formData = new FormData();
  for (const phone of phones) formData.append("phone[]", phone);
  if (whatsapp.length > 0)
    for (const wh of whatsapp) formData.append("whatsapp[]", wh);
  try {
    response = await apiPrivate.post(
      `/api/craftsman/update_phone?craftsman_id=${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
