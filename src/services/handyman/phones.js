import { getCookie } from "../../util/helper";
import { apiPrivate } from "../shared/axios";

export async function addPhones({ id, phones, whatsapp }) {
  let response;
  const formData = new FormData();
  if (phones.length > 0)
    for (const phone of phones) formData.append("phone[]", phone);
  if (whatsapp.length > 0)
    for (const wh of whatsapp) formData.append("whatsapp[]", wh);
  formData.append(
    "token",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYmFib29uLXNlbGVjdGVkLWhpcHBvLm5ncm9rLWZyZWUuYXBwL2FwaS9jcmFmdHNtYW4vbG9naW4iLCJpYXQiOjE3MTg5MjI0NTIsImV4cCI6MTczNjkyMjQ1MiwibmJmIjoxNzE4OTIyNDUyLCJqdGkiOiJCOXVpTFI4SlAyS2hiczBWIiwic3ViIjoiMzkiLCJwcnYiOiJiZDBkOTQwMmIyYjFlYjA0NWIxODU5NWY5ZGU3MzU2NWI1YzczNGExIn0.H2_Aj76g6ePdUOpze3CrQBXid34YDW1TnJosTj9DDqk",
  );
  console.log(formData.getAll("phone[]"));
  try {
    response = await apiPrivate.post(
      `/api/craftsman/add_phone?craftsman_id=${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYmFib29uLXNlbGVjdGVkLWhpcHBvLm5ncm9rLWZyZWUuYXBwL2FwaS9jcmFmdHNtYW4vbG9naW4iLCJpYXQiOjE3MTg5MjI0NTIsImV4cCI6MTczNjkyMjQ1MiwibmJmIjoxNzE4OTIyNDUyLCJqdGkiOiJCOXVpTFI4SlAyS2hiczBWIiwic3ViIjoiMzkiLCJwcnYiOiJiZDBkOTQwMmIyYjFlYjA0NWIxODU5NWY5ZGU3MzU2NWI1YzczNGExIn0.H2_Aj76g6ePdUOpze3CrQBXid34YDW1TnJosTj9DDqk",
        },
      },
    );
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
export async function updatePhones({ id, phones, whatsapp }) {
  let response;
  const formData = new FormData();
  formData.append("token", getCookie("token"));
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
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
