import Axios from "./apiCalls";
import queryString from "query-string";
import { removeFalsyValuesFromObject } from "../utils/generalUtils";

const booksURL = `/books`;

export const getAllBooks = (filters) => {
  let cleanedFilters = removeFalsyValuesFromObject({ ...filters });
  const url = `${booksURL}?${queryString.stringify(cleanedFilters)}`;
  return Axios.get(url).then((res) => res.data);
};

// TODO: change according to api
export const getAssignedBooks = (userId) => {
  const books = [
    { id: 101, name: "Amazon" },
    { id: 103, name: "Google" },
    { id: 110, name: "Apple" },
  ];
  return Promise.resolve(books);
  const url = `${booksURL}?${queryString.stringify({ userId })}`;
  return Axios.get(url);
};

export const addBook = (data) => {
  const url = booksURL;
  return Axios.post(url, data).then((res) => res.data);
};

export const updateBook = (tradeId, data) => {
  const url = `${booksURL}/${tradeId}`;
  return Axios.put(url, data);
};

// TODO: soft delete
export const deleteBook = (tradeId) => {
  const url = `${booksURL}/${tradeId}`;
  return Axios.delete(url);
};

export const getAssignedUsersOfBook = (bookId) => {
  return Promise.resolve([
    { id: 1, email: "few", name: "fwfcs", role: "edwqd" },
    { id: 2, email: "Ffrefw", name: "opefwu", role: "edwqd" },
    { id: 3, email: "qidoqi", name: "dewqufw", role: "edwqd" },
  ]);
  const url = `${booksURL}/${bookId}/users`;
  return Axios.get(url);
};
