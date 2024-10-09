import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";

export class CategoryController {
  static async getCategories(_: Request, res: Response) {
    try {
      const categories = await CategoryService.getCategories();
      res.json(categories);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const category = await CategoryService.getCategoryById(id);

      if (!category) {
        res.status(404).json({ error: "Categoría no encontrada" });
        return;
      }
      res.json(category);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async getCategoryByName(req: Request, res: Response) {
    const { name } = req.params;

    try {
      const category = await CategoryService.getCategoryByName(name);

      if (!category) {
        res.status(404).json({ error: "Categoría no encontrada" });
        return;
      }
      res.json(category);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async createCategory(req: Request, res: Response) {
    const { name, description } = req.body;

    try {
      const category = await CategoryService.createCategory({
        name,
        description,
      });
      res.json(category);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const category = await CategoryService.updateCategory(id, {
        name,
        description,
      });
      res.json(category);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async activateCategory(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const category = await CategoryService.activateCategory(id);
      res.json(category);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async deactivateCategory(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const category = await CategoryService.deactivateCategory(id);
      res.json(category);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const category = await CategoryService.deleteCategory(id);
      res.json(category);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
