import Axios from "./apiCalls";
import { setCookie, clearCookie } from "../utils/cookieUtils";
import { ACCESS_TOKEN, ROLE_TOKEN } from "../config/enums/misc";

export const findMe = () => {
  return Axios.get(`/me`);
};

export const login = (role) => {
  setCookie(ACCESS_TOKEN, "fakeToken");
  setCookie(ROLE_TOKEN, role);
  return Promise.resolve();
};

export const logout = () => {
  clearCookie(ACCESS_TOKEN);
  clearCookie(ROLE_TOKEN);
};
