import { Response, Request, NextFunction } from "express";
import { DiscountService } from "../services/discountService";

export class DiscountController {
  static async getDiscounts(_: Request, res: Response, next: NextFunction) {
    try {
      const discounts = await DiscountService.getDiscounts();

      if (!discounts) {
        res.status(404).json({ error: "No hay descuentos" });
        return;
      }

      res.json(discounts);
    } catch (error) {
      next(error);
    }
  }

  static async getDiscountById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const discount = await DiscountService.getDiscountById(id);

      if (!discount) {
        res.status(404).json({ error: "Descuento no encontrado" });
        return;
      }
      res.json(discount);
    } catch (error) {
      next(error);
    }
  }

  static async createDiscount(req: Request, res: Response, next: NextFunction) {
    const { description, discount } = req.body;

    try {
      const newDiscount = await DiscountService.createDiscount({
        description,
        discount,
      });

      res.json(newDiscount);
    } catch (error) {
      next(error);
    }
  }

  static async updateDiscount(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { description, discount } = req.body;

    try {
      const updatedDiscount = await DiscountService.updateDiscount(id, {
        description,
        discount,
      });

      res.json(updatedDiscount);
    } catch (error) {
      next(error);
    }
  }

  static async activateDiscount(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const updatedDiscount = await DiscountService.activateDiscount(id);

      res.json(updatedDiscount);
    } catch (error) {
      next(error);
    }
  }

  static async deactivateDiscount(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const updatedDiscount = await DiscountService.deactivateDiscount(id);

      res.json(updatedDiscount);
    } catch (error) {
      next(error);
    }
  }

  static async deleteDiscount(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const deletedDiscount = await DiscountService.deleteDiscount(id);

      res.json(deletedDiscount);
    } catch (error) {
      next(error);
    }
  }
}
