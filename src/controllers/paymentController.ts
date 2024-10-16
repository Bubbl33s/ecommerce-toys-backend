import { Request, Response, NextFunction } from "express";
import { PaymentService } from "../services/paymentService";

export class PaymentController {
  static async createPaymentFromUserCart(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const payment = await PaymentService.createPaymentFromUserCart(id);

      res.status(201).json(payment);
    } catch (error) {
      next(error);
    }
  }

  static async paymentSuccess(_: Request, res: Response, next: NextFunction) {
    try {
      res.json({ message: "Pago exitoso" });
    } catch (error) {
      next(error);
    }
  }

  static async paymentFailure(_: Request, res: Response, next: NextFunction) {
    try {
      res.json({ message: "Pago fallido" });
    } catch (error) {
      next(error);
    }
  }
}
