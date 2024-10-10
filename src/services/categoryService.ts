import prisma from "./prisma";

type CategoryData = {
  name: string;
  description?: string;
};

export class CategoryService {
  static async getCategories() {
    return prisma.category.findMany();
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

    return prisma.category.update({
      where: { id },
      data: { isDeleted: true },
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
