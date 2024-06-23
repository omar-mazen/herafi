import { setCookie } from "../../util/helper";
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
    if (role == "client") {
      response = await api.post(`/api/client/register`, {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
    } else {
      response = await api.post(`/api/craftsman/register`, {
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
    if (!response.data.status) throw new Error(response.data.message);
    const { token, id } = await response.data;
    console.log(response);
    setCookie("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        role,
        id,
      }),
    );
    return role;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function facebookLogin({ email, name, id, role }) {
  let response;
  try {
    if (role == "client") {
      response = await api.post("/api/client/facebook", {
        email,
        name,
        user_id: id,
      });
    } else {
      response = await api.post("/api/craftsman/facebook", {
        email,
        name,
        user_id: id,
      });
    }
    const { token, id: apiId } = await response.data;
    setCookie("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        role,
        id: apiId,
      }),
    );
    return role;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
export async function googleLogin({ email, name, id, role }) {
  let response;
  try {
    if (role == "client") {
      console.log("client");
      response = await api.post("/api/client/google", {
        email,
        name,
        user_id: id,
      });
    } else {
      response = await api.post("/api/craftsman/google", {
        email,
        name,
        user_id: id,
      });
    }
    const { token, id: apiId } = await response.data;
    setCookie("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        role,
        id: apiId,
      }),
    );
    return role;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function forgotPassword({ email, role }) {
  console.log(email, role);
  let response;
  try {
    if (role == "client") {
      response = await api.post("/api/client/forgot_password", {
        email,
      });
    } else {
      response = await api.post("/api/craftsman/forgot_password", {
        email,
      });
    }
    return response?.data?.message;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function resetPassword({
  email,
  code,
  password,
  passwordConfirmation,
  role,
}) {
  let response;
  console.log(password, passwordConfirmation);
  try {
    if (role == "client") {
      response = await api.post("/api/client/reset_password", {
        email,
        password,
        code,
        password_confirmation: passwordConfirmation,
      });
    } else {
      response = await api.post("/api/craftsman/reset_password", {
        email,
        code,
        password,
        password_confirmation: passwordConfirmation,
      });
    }

    return response?.data?.message;
  } catch (error) {
    console.log(error);
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
