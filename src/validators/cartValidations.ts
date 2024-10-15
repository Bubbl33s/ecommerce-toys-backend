import { body } from "express-validator";
import { quantityValidator } from "./base";

export const addItemCartValidator = [
  body("cartId")
    .exists()
    .withMessage("El carrito es requerido")
    .isString()
    .withMessage("El carrito debe ser válido"),

  body("productId")
    .exists()
    .withMessage("El producto es requerido")
    .isString()
    .withMessage("El producto debe ser válido"),

  quantityValidator,
];
