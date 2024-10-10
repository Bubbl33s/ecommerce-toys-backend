import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      error: "Errores de validación",
      details: errors.array(),
    });
  } else {
    next();
  }
};

export default validate;
