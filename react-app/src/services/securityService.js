import Axios from "./apiCalls";
import queryString from "query-string";
import { removeFalsyValuesFromObject } from "../utils/generalUtils";

const securityURL = `/securities`;

export const getSecurities = (filters) => {
  return Promise.resolve([
    {
      id: 1001,
      inis: "xyz123",
      cusip: "abc",
      issuer: "apple",
      maturityDate: "2023-08-31T18:30:00.000+00:00",
      coupon: "1001-a",
      type: "asset",
      faceValue: 1000,
      status: "active",
    },
    {
      id: 1002,
      inis: "tdz785",
      cusip: "ghd",
      issuer: "google",
      maturityDate: "2025-10-13T18:30:00.000+00:00",
      coupon: "1002-b",
      type: "instrument",
      faceValue: 2000,
      status: "active",
    },
    {
      id: 1003,
      inis: "askhd234",
      cusip: "shdg",
      issuer: "tesla",
      maturityDate: "2022-08-30T18:30:00.000+00:00",
      coupon: "1003-c",
      type: "asset",
      faceValue: 3400,
      status: "active",
    },
  ]);
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
