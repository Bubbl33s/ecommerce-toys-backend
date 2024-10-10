import {
  fullNameValidator,
  emailValidator,
  usernameValidator,
  passwordValidator,
} from "./base";

export const updateAdminValidator = [
  fullNameValidator,
  emailValidator,
  usernameValidator,
];

export const createAdminValidator = [
  ...updateAdminValidator,
  passwordValidator,
];
