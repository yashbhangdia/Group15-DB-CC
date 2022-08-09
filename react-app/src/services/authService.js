import Axios from "./apiCalls";
import { setCookie } from "../utils/cookieUtils";
import { ACCESS_TOKEN } from "../config/enums/misc";

export const findMe = () => {
  return Axios.get(`/me`);
};

export const login = () => {
  setCookie(ACCESS_TOKEN, "fakeToken");
  return Promise.resolve();
};
