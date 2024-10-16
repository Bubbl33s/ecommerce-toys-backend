import prisma from "./prisma";

export interface BrandData {
  name: string;
  description?: string;
}

export class BrandService {
  static async getBrands() {
    return prisma.brand.findMany({ include: { products: true } });
  }

  static async getBrandById(id: string) {
    return prisma.brand.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  static async getBrandByName(name: string) {
    return prisma.brand.findUnique({
      where: { name },
    });
  }

  static async createBrand({ name, description }: BrandData) {
    const brandExists = await this.getBrandByName(name);

    if (brandExists) {
      throw new Error("Ya existe una marca con ese nombre");
    }

    return prisma.brand.create({
      data: { name, description },
    });
  }

  static async updateBrand(id: string, { name, description }: BrandData) {
    const brandExists = await this.getBrandById(id);

    if (!brandExists) {
      throw new Error("No existe una marca con ese ID");
    }

    const brandNameExists = await this.getBrandByName(name);

    if (brandNameExists && brandNameExists?.id !== id) {
      throw new Error("Ya existe una marca con ese nombre");
    }

    return prisma.brand.update({
      where: { id },
      data: { name, description },
    });
  }

  static async activateBrand(id: string) {
    const brandExists = await this.getBrandById(id);

    if (!brandExists) {
      throw new Error("No existe una marca con ese ID");
    }

    return prisma.brand.update({
      where: { id },
      data: { isDeleted: false },
    });
  }

  static async deactivateBrand(id: string) {
    const brandExists = await this.getBrandById(id);

    if (!brandExists) {
      throw new Error("No existe una marca con ese ID");
    }

    return prisma.$transaction(async (prismaTx) => {
      try {
        // Desactivar los productos relacionados
        await prismaTx.product.updateMany({
          where: { categoryId: id },
          data: { isDeleted: true },
        });

        return prismaTx.brand.update({
          where: { id },
          data: { isDeleted: true },
        });
      } catch (error) {
        throw new Error("No se pudo desactivar la marca");
      }
    });
  }

  static async deleteBrand(id: string) {
    const brandExists = await this.getBrandById(id);

    if (!brandExists) {
      throw new Error("No existe una marca con ese ID");
    }

    return prisma.brand.delete({
      where: { id },
    });
  }
}
