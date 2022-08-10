import Axios from "./apiCalls";
import queryString from "query-string";
import { removeFalsyValuesFromObject } from "../utils/generalUtils";

const securityURL = `/securities`;

export const getSecurities = (filters) => {
  let cleanedFilters = removeFalsyValuesFromObject({ ...filters });
  let url = cleanedFilters.issuer ? `${securityURL}/bookName` : securityURL;
  url = `${url}?${queryString.stringify(cleanedFilters)}`;
  return Axios.get(url).then((res) => res.data);
};

export const addSecurity = (data) => {
  const url = securityURL;
  return Axios.post(url, data).then((res) => res.data);
};

export const updateSecurity = (securityId, data) => {
  const url = `${securityURL}/${securityId}`;
  return Axios.put(url, data).then((res) => res.data);
};

export const deleteSecurity = (securityId) => {
  const url = `${securityURL}/${securityId}`;
  return Axios.delete(url).then((res) => res.data);
};

export const getSecurityById = (securityId) => {
  const url = `${securityURL}/${securityId}`;
  return Axios.get(url).then((res) => res.data);
};
