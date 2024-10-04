import axios from "axios";
import { config } from "../utils/config";
import { $authStore, setAuth } from "./stores/authStore";

const api = axios.create({
  baseURL: config.apIUrl,
});

api.interceptors.response.use((res) => {
  if (res.status === 401) {
    setAuth(null);
  }

  return res;
});

api.interceptors.request.use((req) => {
  const authData = $authStore.get();
  if (authData) {
    const { token } = authData;
    const authHeader = `Bearer ${token}`;
    req.headers.Authorization = authHeader;
  }

  return req;
});

export { api };
