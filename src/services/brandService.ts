import prisma from "./prisma";

export interface BrandData {
  name: string;
  description?: string;
}

export class BrandService {
  static async getBrands() {
    return prisma.brand.findMany();
  }

  static async getBrandById(id: string) {
    return prisma.brand.findUnique({
      where: { id },
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

    return prisma.brand.update({
      where: { id },
      data: { isDeleted: true },
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
