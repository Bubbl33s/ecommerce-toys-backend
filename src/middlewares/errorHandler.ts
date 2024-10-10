import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: any,
  _: Request,
  res: Response,
  __: NextFunction,
) {
  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
