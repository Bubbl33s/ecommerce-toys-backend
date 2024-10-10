import prisma from "./prisma";

export interface MaterialData {
  name: string;
  description?: string;
}

export class MaterialService {
  static async getMaterials() {
    return prisma.material.findMany();
  }

  static async getMaterialById(id: string) {
    return prisma.material.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  static async getMaterialByName(name: string) {
    return prisma.material.findUnique({
      where: { name },
    });
  }

  static async createMaterial({ name, description }: MaterialData) {
    const materialExists = await this.getMaterialByName(name);

    if (materialExists) {
      throw new Error("Ya existe un material con ese nombre");
    }

    return prisma.material.create({
      data: { name, description },
    });
  }

  static async updateMaterial(id: string, { name, description }: MaterialData) {
    const materialExists = await this.getMaterialById(id);

    if (!materialExists) {
      throw new Error("No existe un material con ese ID");
    }

    const materialNameExists = await this.getMaterialByName(name);

    if (materialNameExists && materialNameExists?.id !== id) {
      throw new Error("Ya existe un material con ese nombre");
    }

    return prisma.material.update({
      where: { id },
      data: { name, description },
    });
  }

  static async activateMaterial(id: string) {
    const materialExists = await this.getMaterialById(id);

    if (!materialExists) {
      throw new Error("No existe un material con ese ID");
    }

    return prisma.material.update({
      where: { id },
      data: { isDeleted: false },
    });
  }

  static async deactivateMaterial(id: string) {
    const materialExists = await this.getMaterialById(id);

    if (!materialExists) {
      throw new Error("No existe un material con ese ID");
    }

    return prisma.$transaction(async (prismaTx) => {
      try {
        // Desactivar los productos relacionados
        await prismaTx.product.updateMany({
          where: { materialId: id },
          data: { isDeleted: true },
        });

        return await prismaTx.material.update({
          where: { id },
          data: { isDeleted: true },
        });
      } catch (error) {
        throw new Error("Error al desactivar el material");
      }
    });
  }

  static async deleteMaterial(id: string) {
    const materialExists = await this.getMaterialById(id);

    if (!materialExists) {
      throw new Error("No existe un material con ese ID");
    }

    return prisma.material.delete({
      where: { id },
    });
  }
}
