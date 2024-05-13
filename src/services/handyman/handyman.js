import { apiPrivate } from "../shared/axios";

export async function completeInfo({
  id,
  address,
  description,
  image,
  craftId,
}) {
  const data = {
    address,
    description,
    image,
    craftId,
  };
  const formdata = new FormData();
  for (const key in data) {
    if (data[key]) formdata.append(key, data[key]);
  }
  let response;
  try {
    response = await apiPrivate.post(
      `/api/craftsman/complete-info?craftsman_id=${id}`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
