import Axios from "./apiCalls";
import queryString from "query-string";
import { removeFalsyValuesFromObject } from "../utils/generalUtils";

const usersURL = `/users`;

export const getUsers = (filters) => {
  return Promise.resolve([
    { id: 1, email: "few", name: "fwfcs", role: "edwqd" },
    { id: 2, email: "Ffrefw", name: "opefwu", role: "edwqd" },
    { id: 3, email: "qidoqi", name: "dewqufw", role: "edwqd" },
  ]);
  let cleanedFilters = removeFalsyValuesFromObject({ ...filters });
  const url = `${usersURL}?${queryString.stringify(cleanedFilters)}`;
  return Axios.get(url);
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

export const assignBook = (bookId, userId) => {
  const url = `${usersURL}/${userId}`;
  return Axios.patch(url, { bookId, userId });
};
