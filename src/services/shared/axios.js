import axios from "axios";
import { getCookie } from "../../util/helper";

const BASE_URL = "https://baboon-selected-hippo.ngrok-free.app";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const apiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getCookie("token")}`,
  },
});
