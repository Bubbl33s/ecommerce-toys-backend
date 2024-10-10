import { fullNameValidator, emailValidator, passwordValidator } from "./base";

export const updateUserValidator = [fullNameValidator, emailValidator];

export const createUserValidator = [...updateUserValidator, passwordValidator];
