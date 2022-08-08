import { ValidationEnum } from "../config/enums/ValidationEnum";
export const UserValidation = {
  name: [
    {
      type: ValidationEnum.REQUIRED,
      message: "Name is required.",
    },
  ],
  email: [
    {
      type: ValidationEnum.REQUIRED,
      message: "Email is required.",
    },
    {
      type: ValidationEnum.PATTERN,
      value:
        // eslint-disable-next-line
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Invalid email.",
    },
  ],
  role: [
    {
      type: ValidationEnum.REQUIRED,
      message: "Role is required.",
    },
  ],
};
