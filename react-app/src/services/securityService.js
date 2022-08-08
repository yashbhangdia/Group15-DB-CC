import Axios from "./apiCalls";
import queryString from "query-string";
import { removeFalsyValuesFromObject } from "../utils/generalUtils";

const securityURL = `/securities`;

export const getSecurities = (filters) => {
  let cleanedFilters = removeFalsyValuesFromObject({ ...filters });
  const url = `${securityURL}?${queryString.stringify(cleanedFilters)}`;
  return Axios.get(url);
};

export const addSecurity = (data) => {
  const url = securityURL;
  return Axios.post(url, data);
};

export const updateSecurity = (tradeId, data) => {
  const url = `${securityURL}/${tradeId}`;
  return Axios.put(url, data);
};

export const deleteSecurity = (tradeId) => {
  const url = `${securityURL}/${tradeId}`;
  return Axios.delete(url);
};
