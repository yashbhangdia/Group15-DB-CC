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
  let url = filters.issuer ? `${securityURL}/bookName` : securityURL;
  url = `${securityURL}?${queryString.stringify(cleanedFilters)}`;
  return Axios.get(url);
};

export const addSecurity = (data) => {
  const url = securityURL;
  return Axios.post(url, data);
};

export const updateSecurity = (securityId, data) => {
  const url = `${securityURL}/${securityId}`;
  return Axios.put(url, data);
};

export const deleteSecurity = (securityId) => {
  const url = `${securityURL}/${securityId}`;
  return Axios.delete(url);
};

export const getSecurityById = (securityId) => {
  const url = `${securityURL}/${securityId}`;
  return Promise.resolve({
    trades: [
      {
        id: 1,
        quantity: 2,
        status: "active",
        price: 300,
        buy_sell: "sell",
        tradeDate: "2020-09-18T18:30:00.000+00:00",
        settlementDate: "2025-08-17T18:30:00.000+00:00",
        book: {
          id: 101,
          createdAt: "2022-08-06",
          lastUpdatedAt: "2022-08-05T18:30:00.000+00:00",
          bookName: "book1",
        },
        security: {
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
        counterparty: {
          id: 10002,
          name: "XYZ",
        },
      },
      {
        id: 2,
        quantity: 3,
        status: "active",
        price: 400,
        buy_sell: "buy",
        tradeDate: "2021-09-18T18:30:10.000+00:00",
        settlementDate: "2022-10-31T18:30:00.000+00:00",
        book: {
          id: 102,
          createdAt: "2022-08-05",
          lastUpdatedAt: "2022-08-05T18:30:00.000+00:00",
          bookName: "book2",
        },
        security: {
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
        counterparty: {
          id: 10001,
          name: "ABC",
        },
      },
      {
        id: 1000001,
        quantity: 1,
        status: "done",
        price: 200,
        buy_sell: "buy",
        tradeDate: "2020-08-18T18:30:00.000+00:00",
        settlementDate: "2020-08-17T18:30:00.000+00:00",
        book: {
          id: 101,
          createdAt: "2022-08-06",
          lastUpdatedAt: "2022-08-05T18:30:00.000+00:00",
          bookName: "book1",
        },
        security: {
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
        counterparty: {
          id: 10001,
          name: "ABC",
        },
      },
    ],
  });
  return Axios.get(url);
};
