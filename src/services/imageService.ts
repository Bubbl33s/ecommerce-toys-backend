import prisma from "./prisma";
import { ProductService } from "./productService";
import cloudinary from "../config/cloudinary";
import { extractPublicId } from "../utilities";

type ImageData = {
  fileBuffer: Express.Multer.File["buffer"];
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

  static async createImage({ fileBuffer, productId }: ImageData) {
    const productExists = await ProductService.getProductById(productId);

    if (!productExists) {
      throw new Error("No existe un producto con ese ID");
    }

    const uploadStream = cloudinary.uploader.upload_stream;

    const result: any = await new Promise((resolve, reject) => {
      const stream = uploadStream(
        { folder: `toy-estore/products/${productId}` },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      stream.end(fileBuffer);
    });

    return prisma.image.create({
      data: {
        url: result.secure_url,
        productId,
      },
    });
  }

  static async deleteImage(id: string) {
    const imageExists = await this.getImageById(id);

    if (!imageExists) {
      throw new Error("No existe una imagen con ese ID");
    }

    await cloudinary.uploader.destroy(extractPublicId(imageExists.url));

    return prisma.image.delete({ where: { id } });
  }
}
