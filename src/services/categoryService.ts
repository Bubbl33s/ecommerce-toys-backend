import prisma from "./prisma";
import cloudinary from "../config/cloudinary";
import { extractPublicId } from "../utilities";

type CategoryData = {
  name: string;
  description?: string;
};

export class CategoryService {
  static async getCategories() {
    return prisma.category.findMany({ include: { products: true } });
  }

  static async getCategoryById(id: string) {
    return prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  static async getCategoryByName(name: string) {
    return prisma.category.findUnique({
      where: { name },
    });
  }

  static async createCategory({ name, description }: CategoryData) {
    const categoryExists = await this.getCategoryByName(name);

    if (categoryExists) {
      throw new Error("Ya existe una categoría con ese nombre");
    }

    return prisma.category.create({
      data: { name, description },
    });
  }

  static async updateCategory(id: string, { name, description }: CategoryData) {
    const categoryExists = await this.getCategoryById(id);

    if (!categoryExists) {
      throw new Error("No existe una categoría con ese ID");
    }

    const categoryNameExists = await this.getCategoryByName(name);

    if (categoryNameExists && categoryNameExists?.id !== id) {
      throw new Error("Ya existe una categoría con ese nombre");
    }

    return prisma.category.update({
      where: { id },
      data: { name, description },
    });
  }

  static async updateCategoryImage(
    id: string,
    fileBuffer: Express.Multer.File["buffer"],
  ) {
    const categoryExists = await this.getCategoryById(id);

    if (!categoryExists) {
      throw new Error("No existe una categoría con ese ID");
    }

    const uploadStream = cloudinary.uploader.upload_stream;

    const result: any = await new Promise((resolve, reject) => {
      const stream = uploadStream(
        { folder: `toy-estore/categories/${id}` },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      stream.end(fileBuffer);
    });

    await this.deleteCategoryImage(id);

    return prisma.category.update({
      where: { id },
      data: { image: result.secure_url },
    });
  }

  static async deleteCategoryImage(id: string) {
    const categoryExists = await this.getCategoryById(id);

    if (!categoryExists) {
      throw new Error("No existe una categoría con ese ID");
    }

    if (categoryExists.image) {
      await cloudinary.uploader.destroy(extractPublicId(categoryExists.image));
    }

    return categoryExists;
  }

  static async activateCategory(id: string) {
    const categoryExists = await this.getCategoryById(id);

    if (!categoryExists) {
      throw new Error("No existe una categoría con ese ID");
    }

    return prisma.category.update({
      where: { id },
      data: { isDeleted: false },
    });
  }

  static async deactivateCategory(id: string) {
    const categoryExists = await this.getCategoryById(id);

    if (!categoryExists) {
      throw new Error("No existe una categoría con ese ID");
    }

    return prisma.$transaction(async (prismaTx) => {
      try {
        // Desactivar los productos relacionados
        await prismaTx.product.updateMany({
          where: { categoryId: id },
          data: { isDeleted: true },
        });

        return prismaTx.category.update({
          where: { id },
          data: { isDeleted: true },
        });
      } catch (error) {
        throw new Error("No se pudo desactivar la categoría");
      }
    });
  }

  static async deleteCategory(id: string) {
    const categoryExists = await this.getCategoryById(id);

    if (!categoryExists) {
      throw new Error("No existe una categoría con ese ID");
    }

    return prisma.category.delete({
      where: { id },
    });
  }
}
