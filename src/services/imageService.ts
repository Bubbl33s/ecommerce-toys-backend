import prisma from "./prisma";
import { ProductService } from "./productService";

type ImageData = {
  url: string;
  productId: string;
};

export class ImageService {
  static async getImages() {
    return prisma.image.findMany();
  }

  static async getImageById(id: string) {
    return prisma.image.findUnique({ where: { id } });
  }

  static async getImagesByProductId(productId: string) {
    const productExists = await ProductService.getProductById(productId);

    if (!productExists) {
      throw new Error("No existe un producto con ese ID");
    }

    return prisma.image.findMany({ where: { productId } });
  }

  static async createImage(data: ImageData) {
    return prisma.image.create({ data });
  }

  static async deleteImage(id: string) {
    const imageExists = await this.getImageById(id);

    if (!imageExists) {
      throw new Error("No existe una imagen con ese ID");
    }

    return prisma.image.delete({ where: { id } });
  }
}
