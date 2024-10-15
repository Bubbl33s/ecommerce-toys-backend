import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/orderService";

export class OrderController {
  static async getOrders(_: Request, res: Response, next: NextFunction) {
    try {
      const orders = await OrderService.getOrders();

      if (!orders) {
        res.status(404).json({ error: "No hay órdenes" });
        return;
      }

      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async getOrderById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const order = await OrderService.getOrderById(id);
      if (!order) {
        res.status(404).json({ error: "Orden no encontrada" });
        return;
      }

      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  static async getOrdersByUserId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { userId } = req.params;

    try {
      const orders = await OrderService.getOrdersByUserId(userId);

      if (!orders) {
        res.status(404).json({ error: "No hay órdenes" });
        return;
      }

      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async createOrderFromUserCart(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { userId } = req.params;

    try {
      const order = await OrderService.createOrderFromUserCart(userId);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  static async updateOrderStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const order = await OrderService.updateOrderStatus(id, status);

      if (!order) {
        res.status(404).json({ error: "Orden no encontrada" });
        return;
      }

      res.json(order);
    } catch (error) {
      next(error);
    }
  }
}
