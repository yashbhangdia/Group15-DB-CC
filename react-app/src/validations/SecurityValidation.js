import { ValidationEnum } from "../config/enums/ValidationEnum";
export const SecurityValidation = {
  isin: [
    {
      type: ValidationEnum.REQUIRED,
      message: "ISIN is required.",
    },
    {
      type: ValidationEnum.PATTERN,
      value: /^\b([A-Z]{2})((?![A-Z]{10}\b)[A-Z0-9]{10})\b$/,
      message: "Invalid ISIN.",
    },
  ],
  cusip: [
    {
      type: ValidationEnum.REQUIRED,
      message: "CUSIP is required.",
    },
    {
      type: ValidationEnum.PATTERN,
      value: /^[0-9]{3}[a-zA-Z0-9]{2}[a-zA-Z0-9*@#]{3}[0-9]$/,
      message: "Invalid CUSIP.",
    },
  ],
  issuer: [
    {
      type: ValidationEnum.REQUIRED,
      message: "Issuer is required.",
    },
  ],
  maturityDate: [
    {
      type: ValidationEnum.REQUIRED,
      message: "Maturity Date is required.",
    },
  ],
  coupon: [
    {
      type: ValidationEnum.REQUIRED,
      message: "Coupon is required.",
    },
  ],
  type: [
    {
      type: ValidationEnum.REQUIRED,
      message: "Type is required.",
    },
  ],
  faceValue: [
    {
      type: ValidationEnum.REQUIRED,
      message: "Face Value is required.",
    },
  ],
  status: [
    {
      type: ValidationEnum.REQUIRED,
      message: "Status is required.",
    },
  ],
};
