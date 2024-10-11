import { body } from "express-validator";

export const productValidator = [
  body("name")
    .exists()
    .withMessage("El nombre es requerido")
    .isString()
    .withMessage("El nombre debe ser válido")
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre debe tener entre 3 y 50 caracteres"),

  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser válida")
    .isLength({ max: 255 })
    .withMessage("La descripción debe tener máximo 255 caracteres"),

  body("price")
    .exists()
    .withMessage("El precio es requerido")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser mayor o igual a 0")
    .toFloat(),

  body("stock")
    .exists()
    .withMessage("El stock es requerido")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero mayor o igual a 0")
    .toInt(),

  body("categoryId")
    .exists()
    .withMessage("La categoría es requerida")
    .isString()
    .withMessage("La categoría debe ser válida"),

  body("brandId")
    .exists()
    .withMessage("La marca es requerida")
    .isString()
    .withMessage("La marca debe ser válida"),

  body("materialId")
    .optional()
    .isString()
    .withMessage("El material debe ser válido"),

  body("discountId")
    .optional()
    .isString()
    .withMessage("El descuento debe ser válido"),
];
