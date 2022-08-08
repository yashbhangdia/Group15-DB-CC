import Axios from "./apiCalls";
import queryString from "query-string";
import { removeFalsyValuesFromObject } from "../utils/generalUtils";

const tradeURL = `/trades`;

export const getTrades = (filters) => {
  let cleanedFilters = removeFalsyValuesFromObject({ ...filters });
  const url = `${tradeURL}?${queryString.stringify(cleanedFilters)}`;
  return Axios.get(url);
};

export const addTrade = (data) => {
  const url = tradeURL;
  return Axios.post(url, data);
};

export const updateTrade = (tradeId, data) => {
  const url = `${tradeURL}/${tradeId}`;
  return Axios.put(url, data);
};

export const deleteTrade = (tradeId) => {
  const url = `${tradeURL}/${tradeId}`;
  return Axios.delete(url);
};
