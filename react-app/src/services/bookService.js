import Axios from "./apiCalls";
import queryString from "query-string";
import { removeFalsyValuesFromObject } from "../utils/generalUtils";

const booksURL = `/books`;

export const getAllBooks = (filters) => {
  let cleanedFilters = removeFalsyValuesFromObject({ ...filters });
  const url = `${booksURL}?${queryString.stringify(cleanedFilters)}`;
  return Axios.get(url);
};

// TODO: change according to api
export const getAssignedBooks = (userId) => {
  return Promise.resolve([
    { value: 101, label: "Amazon" },
    { value: 103, label: "Google" },
    { value: 110, label: "Apple" },
  ]);
  const url = `${booksURL}?${queryString.stringify({ userId })}`;
  return Axios.get(url);
};

export const addBook = (data) => {
  const url = booksURL;
  return Axios.post(url, data);
};

export const updateBook = (tradeId, data) => {
  const url = `${booksURL}/${tradeId}`;
  return Axios.put(url, data);
};

export const deleteBook = (tradeId) => {
  const url = `${booksURL}/${tradeId}`;
  return Axios.delete(url);
};
