import { hostNameUrl } from "../config/api";
import axios from "axios";
import { setCookie } from "../utils/cookieUtils";
import { ACCESS_TOKEN } from "../config/enums/misc";

export const findMe = () => {
  return axios.get(`${hostNameUrl}/me`);
};

export const login = () => {
  setCookie(ACCESS_TOKEN, "fakeToken");
  return Promise.resolve();
};
