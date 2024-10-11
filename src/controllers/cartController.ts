import { Request, Response, NextFunction } from "express";
import { CartService } from "../services/cartService";

export class CartController {
  static async getCartById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const cart = await CartService.getCartById(id);
      res.json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async getCartByUserId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { userId } = req.params;
      const cart = await CartService.getCartByUserId(userId);
      res.json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async addCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { cartId, productId, quantity } = req.body;

      const cartItem = await CartService.addCartItem({
        cartId,
        productId,
        quantity,
      });
      res.json(cartItem);
    } catch (error) {
      next(error);
    }
  }

  static async updateCartItemQuantity(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { cartItemId } = req.params;
      const { quantity } = req.body;

      const cartItem = await CartService.updateCartItemQuantity(
        cartItemId,
        quantity,
      );
      res.json(cartItem);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { cartItemId } = req.params;

      const cartItem = await CartService.deleteCartItem(cartItemId);
      res.json(cartItem);
    } catch (error) {
      next(error);
    }
  }
}