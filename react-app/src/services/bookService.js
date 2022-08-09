import Axios from "./apiCalls";
import queryString from "query-string";
import { removeFalsyValuesFromObject } from "../utils/generalUtils";

const booksURL = `/books`;

export const getAllBooks = (filters) => {
  let cleanedFilters = removeFalsyValuesFromObject({ ...filters });
  const url = `${booksURL}?${queryString.stringify(cleanedFilters)}`;
  return Axios.get(url).then((res) => res.data);
};

export const getAssignedBooks = (userId) => {
  const url = `/user/books?${queryString.stringify({ id: userId })}`;
  return Axios.get(url).then((res) => res.data);
};

export const addBook = (data) => {
  const url = booksURL;
  return Axios.post(url, data).then((res) => res.data);
};

export const assignUserToBook = (data) => {
  return Axios.post("/bookuser", data).then((res) => res.data);
};

export const updateBook = (tradeId, data) => {
  const url = `${booksURL}/${tradeId}`;
  return Axios.put(url, data).then((res) => res.data);
};

// TODO: soft delete
export const deleteBook = (tradeId) => {
  const url = `${booksURL}/${tradeId}`;
  return Axios.delete(url).then((res) => res.data);
};

export const getAssignedUsersOfBook = (bookId) => {
  const url = `/book/users?id=${bookId}`;
  return Axios.get(url).then((res) => res.data);
};
