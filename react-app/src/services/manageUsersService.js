import Axios from "./apiCalls";
import queryString from "query-string";
import { removeFalsyValuesFromObject } from "../utils/generalUtils";

const usersURL = `/users`;

export const getUsers = (filters) => {
  let cleanedFilters = removeFalsyValuesFromObject({ ...filters });
  const url = `${usersURL}?${queryString.stringify(cleanedFilters)}`;
  return Axios.get(url).then((res) => res.data);
};

export const addUser = (data) => {
  const url = usersURL;
  return Axios.post(url, data);
};

export const updateUser = (userId, data) => {
  const url = `${usersURL}/${userId}`;
  return Axios.put(url, data);
};

export const deleteUser = (userId) => {
  const url = `${usersURL}/${userId}`;
  return Axios.delete(url);
};
