import axios from "axios";
import { ACCESS_TOKEN } from "../config/enums/misc";
import { hostNameUrl } from "../config/api";
import { getCookie } from "../utils/cookieUtils";

const baseAPIURL = hostNameUrl;

const instance = axios.create({ baseURL: baseAPIURL });

instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie(ACCESS_TOKEN);
    if (accessToken) {
      config.headers["Authorization"] = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
