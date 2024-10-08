import prisma from "./prisma";

export class ProductService {
  static async getProducts() {
    return prisma.product.findMany();
  }

  static async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
    });
  }
}
