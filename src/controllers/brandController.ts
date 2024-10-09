import { Request, Response } from "express";
import { BrandService } from "../services/brandService";

export class BrandController {
  static async getBrands(_: Request, res: Response) {
    try {
      const brands = await BrandService.getBrands();

      if (!brands) {
        res.status(404).json({ error: "No hay marcas" });
        return;
      }
      res.json(brands);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async getBrandById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const brand = await BrandService.getBrandById(id);

      if (!brand) {
        res.status(404).json({ error: "Marca no encontrada" });
        return;
      }
      res.json(brand);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async getBrandByName(req: Request, res: Response) {
    const { name } = req.params;

    try {
      const brand = await BrandService.getBrandByName(name);

      if (!brand) {
        res.status(404).json({ error: "Marca no encontrada" });
        return;
      }
      res.json(brand);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
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
        return;
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
        return;
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
        return;
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
        return;
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
        return;
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
