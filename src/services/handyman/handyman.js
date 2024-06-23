import { apiPrivate } from "../shared/axios";

export async function completeInfo({
  id,
  address,
  description,
  image,
  craftId,
  cities,
  phones,
  whatsapp,
}) {
  const data = {
    address,
    description,
    image,
    craft_id: craftId,
  };
  const formData = new FormData();

  for (const key in data) if (data[key]) formData.append(key, data[key]);

  for (const city of cities) formData.append("city[]", city);

  if (phones.length > 0)
    for (const phone of phones) formData.append("phone[]", phone);

  if (whatsapp.length > 0)
    for (const wh of whatsapp) formData.append("whatsapp[]", wh);

  formData.forEach((e) => console.log(e));
  let response;
  try {
    response = await apiPrivate.post(
      `/api/craftsman/complete-info?craftsman_id=${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    const data = response.data;
    console.log(response);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
