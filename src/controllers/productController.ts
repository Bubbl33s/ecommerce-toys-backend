import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/productService";

export class ProductController {
  static async getProducts(_: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const product = await ProductService.createProduct(data);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
}
