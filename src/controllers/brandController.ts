import { Request, Response } from "express";
import { BrandService } from "../services/brandService";

export class BrandController {
  static async getBrands(_: Request, res: Response) {
    const brands = await BrandService.getBrands();
    res.json(brands);
  }

  static async getBrandById(req: Request, res: Response) {
    const { id } = req.params;
    const brand = await BrandService.getBrandById(id);
    res.json(brand);
  }

  static async getBrandByName(req: Request, res: Response) {
    const { name } = req.params;
    const brand = await BrandService.getBrandByName(name);
    res.json(brand);
  }

  static async createBrand(req: Request, res: Response) {
    const { name, description } = req.body;

    try {
      const brand = await BrandService.createBrand({
        name,
        description,
      });
      res.json(brand);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async updateBrand(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const brand = await BrandService.updateBrand(id, {
        name,
        description,
      });
      res.json(brand);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async activateBrand(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const brand = await BrandService.activateBrand(id);
      res.json(brand);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async deactivateBrand(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const brand = await BrandService.deactivateBrand(id);
      res.json(brand);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async deleteBrand(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const brand = await BrandService.deleteBrand(id);
      res.json(brand);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
