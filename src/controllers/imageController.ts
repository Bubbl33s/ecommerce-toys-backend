import { Request, Response, NextFunction } from "express";
import { ImageService } from "../services/imageService";

export class ImageController {
  static async getImages(_: Request, res: Response, next: NextFunction) {
    try {
      const images = await ImageService.getImages();

      if (!images) {
        res.status(404).json({ error: "No hay imágenes" });
        return;
      }

      res.json(images);
    } catch (error) {
      next(error);
    }
  }

  static async getImageById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const image = await ImageService.getImageById(id);

      if (!image) {
        res.status(404).json({ error: "Imagen no encontrada" });
        return;
      }

      res.json(image);
    } catch (error) {
      next(error);
    }
  }

  static async getImagesByProductId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { productId } = req.params;
      const images = await ImageService.getImagesByProductId(productId);

      if (!images) {
        res.status(404).json({ error: "No hay imágenes para ese producto" });
        return;
      }

      res.json(images);
    } catch (error) {
      next(error);
    }
  }

  static async createImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const file = req.file;

      if (!file) {
        throw new Error("No se ha enviado un archivo");
      }

      const image = await ImageService.createImage({
        url: file.path,
        productId,
      });

      res.json(image);
    } catch (error) {
      next(error);
    }
  }

  static async deleteImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await ImageService.deleteImage(id);
      res.json({ message: "Imagen eliminada" });
    } catch (error) {
      next(error);
    }
  }
}
