import { body } from "express-validator";

export const orderStatusValidator = body("status")
  .exists()
  .withMessage("El campo status es requerido")
  .isString()
  .withMessage("El campo status debe ser un string")
  .isIn(["Pendiente", "Enviada", "Recibida"])
  .withMessage(
    "El campo status debe ser uno de: Pendiente, Enviado, Entregado",
  );
