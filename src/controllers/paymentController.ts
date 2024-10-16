import { Request, Response, NextFunction } from "express";
import { PaymentService } from "../services/paymentService";
import { OrderService } from "../services/orderService";

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

  static async handleWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const paymentId = req.query["data.id"] as string;

      if (!paymentId) {
        res.status(400).json({ message: "Payment ID not found" });
        return;
      }

      await PaymentService.handleWebhook(paymentId);

      res.json({ message: "Orden creada" });
    } catch (error) {
      next(error);
    }
  }
}
