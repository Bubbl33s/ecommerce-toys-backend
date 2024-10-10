import { NextFunction, Request, Response } from "express";
import { BrandService } from "../services/brandService";

export class BrandController {
  static async getBrands(_: Request, res: Response, next: NextFunction) {
    try {
      const brands = await BrandService.getBrands();

      if (!brands) {
        res.status(404).json({ error: "No hay marcas" });
        return;
      }
      res.json(brands);
    } catch (error) {
      next(error);
    }
  }

  static async getBrandById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const brand = await BrandService.getBrandById(id);

      if (!brand) {
        res.status(404).json({ error: "Marca no encontrada" });
        return;
      }
      res.json(brand);
    } catch (error) {
      next(error);
    }
  }

  static async getBrandByName(req: Request, res: Response, next: NextFunction) {
    const { name } = req.params;

    try {
      const brand = await BrandService.getBrandByName(name);

      if (!brand) {
        res.status(404).json({ error: "Marca no encontrada" });
        return;
      }
      res.json(brand);
    } catch (error) {
      next(error);
    }
  }

  static async createBrand(req: Request, res: Response, next: NextFunction) {
    const { name, description } = req.body;

    try {
      const brand = await BrandService.createBrand({
        name,
        description,
      });
      res.json(brand);
    } catch (error) {
      next(error);
    }
  }

  static async updateBrand(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const brand = await BrandService.updateBrand(id, {
        name,
        description,
      });
      res.json(brand);
    } catch (error) {
      next(error);
    }
  }

  static async activateBrand(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const brand = await BrandService.activateBrand(id);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  }

  static async deactivateBrand(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const brand = await BrandService.deactivateBrand(id);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBrand(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const brand = await BrandService.deleteBrand(id);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  }
}
