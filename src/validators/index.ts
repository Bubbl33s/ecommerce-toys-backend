import { emailValidator, passwordValidator, entityNameValidator } from "./base";
import { createUserValidator, updateUserValidator } from "./userValidations";
import { createAdminValidator, updateAdminValidator } from "./adminValidations";
import { discountValidator } from "./discountValidations";

export {
  emailValidator,
  passwordValidator,
  createUserValidator,
  updateUserValidator,
  createAdminValidator,
  updateAdminValidator,
  entityNameValidator,
  discountValidator,
};
