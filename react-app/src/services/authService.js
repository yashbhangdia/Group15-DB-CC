import { hostNameUrl } from "../config/api";
import axios from "axios";

export const loginUser = (credentials) => {
  //return axios.post(`${hostNameUrl}/login`, credentials);
  return {token: '1234'};
};

export const logoutUser = (credentials) => {
  //return axios.post(`${hostNameUrl}/login`, credentials);
  return {token: '1234'};
};