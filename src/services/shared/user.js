import { apiPrivate } from "./axios";

export async function getUserById({ id, role }) {
  let response;
  try {
    if (role == "client") {
      response = await apiPrivate.post(`/api/client/get_user?client_id=${id}`);
    } else {
      response = await apiPrivate.post(
        `/api/craftsman/get_user?craftsman_id=${id}`,
      );
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
export async function updateInfo({ id, role, address, description, image }) {
  const data = {
    address,
    description,
    image,
  };
  const formdata = new FormData();
  for (const key in data) {
    if (data[key]) formdata.append(key, data[key]);
  }
  let response;
  try {
    if (role == "client") {
      response = await apiPrivate.post(
        `/api/client/update-info?client_id=${id}`,
        formdata,
      );
    } else {
      response = await apiPrivate.post(
        `/api/craftsman/update-info?craftsman_id=${id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    }
    const data = response.data;
    console.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function updatePassword({
  id,
  role,
  password,
  passwordConfirmation: password_confirmation,
}) {
  const data = {
    password,
    password_confirmation,
  };
  const formdata = new FormData();
  for (const key in data) {
    if (data[key]) formdata.append(key, data[key]);
  }
  let response;
  try {
    if (role == "client") {
      response = await apiPrivate.post(
        `/api/client/update-info?client_id=${id}`,
        formdata,
      );
    } else {
      response = await apiPrivate.post(
        `/api/craftsman/update-info?craftsman_id=${id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    }
    const data = response.data;
    console.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
