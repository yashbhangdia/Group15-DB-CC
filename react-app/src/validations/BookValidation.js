import { ValidationEnum } from "../config/enums/ValidationEnum";
export const BookValidation = {
  name: [
    {
      type: ValidationEnum.REQUIRED,
      message: "Book Name is required.",
    },
  ],
};
