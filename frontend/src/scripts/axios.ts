import axios from "axios";
import { config } from "../utils/config";
import { setAuthUser } from "./stores/authUser";

const api = axios.create({
  baseURL: config.apIUrl,
  withCredentials: true,
});

api.interceptors.response.use((res) => {
  if (res.status === 401) {
    setAuthUser(null);
  }

  return res;
});

export { api };
