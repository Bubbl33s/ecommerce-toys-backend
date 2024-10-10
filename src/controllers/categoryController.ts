import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/categoryService";

export class CategoryController {
  static async getCategories(_: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getCategories();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const category = await CategoryService.getCategoryById(id);

      if (!category) {
        res.status(404).json({ error: "Categoría no encontrada" });
        return;
      }
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryByName(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { name } = req.params;

    try {
      const category = await CategoryService.getCategoryByName(name);

      if (!category) {
        res.status(404).json({ error: "Categoría no encontrada" });
        return;
      }
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req: Request, res: Response, next: NextFunction) {
    const { name, description } = req.body;

    try {
      const category = await CategoryService.createCategory({
        name,
        description,
      });
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const category = await CategoryService.updateCategory(id, {
        name,
        description,
      });
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  static async activateCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const category = await CategoryService.activateCategory(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  static async deactivateCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const category = await CategoryService.deactivateCategory(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const category = await CategoryService.deleteCategory(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
}
