import { body } from "express-validator";

export const discountValidator = [
  body("description")
    .exists()
    .withMessage("La descripción es requerida")
    .isString()
    .withMessage("La descripción debe ser un texto")
    .isLength({ min: 5, max: 100 })
    .withMessage("La descripción debe tener entre 5 y 100 caracteres"),

  body("discount")
    .exists()
    .withMessage("El descuento es requerido")
    .isNumeric()
    .withMessage("El descuento debe ser un número")
    .isFloat({ min: 0, max: 1 })
    .withMessage("El descuento debe estar entre 0 y 1")
    .toFloat(),
];
