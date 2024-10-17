import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/productService";

export class ProductController {
  static async getProducts(_: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getProducts();

      if (!products) {
        res.status(404).json({ error: "No hay productos" });
        return;
      }

      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);

      if (!product) {
        res.status(404).json({ error: "Producto no encontrado" });
        return;
      }

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

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;

      const product = await ProductService.updateProduct(id, data);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  static async updateProductStock(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const { stock } = req.body;

      const product = await ProductService.updateProductStock(id, stock);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  static async activateProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const product = await ProductService.activateProduct(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  static async deactivateProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const product = await ProductService.deactivateProduct(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await ProductService.deleteProduct(id);
      res.json({ message: "Producto eliminado" });
    } catch (error) {
      next(error);
    }
  }
}
