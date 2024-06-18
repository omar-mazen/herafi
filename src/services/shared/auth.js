import { deleteCookie, getCookie, setCookie } from "../../util/helper";
import { api } from "./axios";

export async function signup({
  name,
  email,
  password,
  passwordConfirmation,
  role,
}) {
  let response;
  try {
    if (role == "craftsman") {
      response = await api.post(`/api/craftsman/register`, {
        name,
        email,
        password,
        "password confirmation": passwordConfirmation,
      });
    } else {
      response = await api.post(`/api/client/register`, {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error(Object.values(JSON.parse(error.response.data))[0][0]);
  }
  return response.data;
}
export async function login({ email, password, role }) {
  let response;
  try {
    if (role == "client") {
      response = await api.post("/api/client/login", { email, password });
    } else {
      response = await api.post("/api/craftsman/login", { email, password });
    }
    const { token, id } = response.data;

    setCookie("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        role,
        id,
      }),
    );
    window.location.reload();
    return role;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function logout({ role }) {
  // const token = getCookie("token");
  // const formData = new FormData();
  // formData.append("token", token);
  // let response;
  // try {
  //   if (role == "client") {
  //     response = await api.post("/api/client/logout", formData);
  //   } else {
  //     response = await api.post("/api/craftsman/login", formData);
  //   }
  //   console.log(response);
  // } catch (error) {
  //
  //   throw new Error(error.response.data.message);
  // }
}
