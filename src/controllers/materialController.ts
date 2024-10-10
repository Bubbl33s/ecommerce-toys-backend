import { Request, Response, NextFunction } from "express";
import { MaterialService } from "../services/materialService";

export class MaterialController {
  static async getMaterials(_: Request, res: Response, next: NextFunction) {
    try {
      const materials = await MaterialService.getMaterials();

      if (!materials) {
        res.status(404).json({ error: "No hay materiales" });
        return;
      }
      res.json(materials);
    } catch (error) {
      next(error);
    }
  }

  static async getMaterialById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const material = await MaterialService.getMaterialById(id);

      if (!material) {
        res.status(404).json({ error: "Material no encontrado" });
        return;
      }
      res.json(material);
    } catch (error) {
      next(error);
    }
  }

  static async getMaterialByName(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { name } = req.params;

    try {
      const material = await MaterialService.getMaterialByName(name);

      if (!material) {
        res.status(404).json({ error: "Material no encontrado" });
        return;
      }
      res.json(material);
    } catch (error) {
      next(error);
    }
  }

  static async createMaterial(req: Request, res: Response, next: NextFunction) {
    const { name, description } = req.body;

    try {
      const material = await MaterialService.createMaterial({
        name,
        description,
      });
      res.json(material);
    } catch (error) {
      next(error);
    }
  }

  static async updateMaterial(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const material = await MaterialService.updateMaterial(id, {
        name,
        description,
      });
      res.json(material);
    } catch (error) {
      next(error);
    }
  }

  static async activateMaterial(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const material = await MaterialService.activateMaterial(id);
      res.json(material);
    } catch (error) {
      next(error);
    }
  }

  static async deactivateMaterial(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const material = await MaterialService.deactivateMaterial(id);
      res.json(material);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMaterial(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const material = await MaterialService.deleteMaterial(id);
      res.json(material);
    } catch (error) {
      next(error);
    }
  }
}
