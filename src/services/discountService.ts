import prisma from "./prisma";

export interface DiscountData {
  description: string;
  discount: number;
}

export class DiscountService {
  static async getDiscounts() {
    return prisma.discount.findMany();
  }

  static async getDiscountById(id: string) {
    return prisma.discount.findUnique({
      where: { id },
    });
  }

  static async createDiscount({ description, discount }: DiscountData) {
    return prisma.discount.create({
      data: { description, discount },
    });
  }

  static async updateDiscount(
    id: string,
    { description, discount }: DiscountData,
  ) {
    const discountExists = await this.getDiscountById(id);

    if (!discountExists) {
      throw new Error("No existe un descuento con ese ID");
    }

    return prisma.discount.update({
      where: { id },
      data: { description, discount },
    });
  }

  static async activateDiscount(id: string) {
    const discountExists = await this.getDiscountById(id);

    if (!discountExists) {
      throw new Error("No existe un descuento con ese ID");
    }

    return prisma.discount.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  static async deactivateDiscount(id: string) {
    const discountExists = await this.getDiscountById(id);

    if (!discountExists) {
      throw new Error("No existe un descuento con ese ID");
    }

    await prisma.product.updateMany({
      where: { discountId: id },
      data: { discountId: null },
    });

    return prisma.discount.update({
      where: { id },
      data: { isDeleted: false },
    });
  }

  static async deleteDiscount(id: string) {
    const discountExists = await this.getDiscountById(id);

    if (!discountExists) {
      throw new Error("No existe un descuento con ese ID");
    }

    return prisma.discount.delete({
      where: { id },
    });
  }
}
