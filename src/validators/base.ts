import { body } from "express-validator";

export const fullNameValidator = body("fullName")
  .exists()
  .withMessage("El nombre es requerido")
  .isString()
  .withMessage("El nombre debe ser válido")
  .isLength({ min: 3, max: 100 })
  .withMessage("El nombre debe tener entre 3 y 100 caracteres");

export const emailValidator = body("email")
  .exists()
  .withMessage("El correo electrónico es requerido")
  .isString()
  .withMessage("El correo electrónico debe ser válido")
  .isLength({ max: 50 })
  .withMessage("El correo electrónico debe tener máximo 50 caracteres")
  .isEmail()
  .withMessage("El correo electrónico debe ser un email válido");

export const passwordValidator = body("password")
  .exists()
  .withMessage("La contraseña es requerida")
  .isString()
  .withMessage("La contraseña debe ser válida")
  .isLength({ min: 8, max: 25 })
  .withMessage("La contraseña debe tener entre 8 y 25 caracteres")
  .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])/)
  .withMessage(
    "La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial.",
  );

export const usernameValidator = body("username")
  .exists()
  .withMessage("El nombre de usuario es requerido")
  .isString()
  .withMessage("El nombre de usuario debe ser válido")
  .isLength({ min: 8, max: 25 })
  .withMessage("El nombre de usuario debe tener entre 8 y 25 caracteres");

export const entityNameValidator = body("name")
  .exists()
  .withMessage("El nombre es requerido")
  .isString()
  .withMessage("El nombre debe ser válido")
  .isLength({ min: 2, max: 50 })
  .withMessage("El nombre debe tener entre 2 y 50 caracteres");
