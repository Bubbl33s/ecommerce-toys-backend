import prisma from "./prisma";

export class CartService {
  static async getCartById(id: string) {
    return prisma.cart.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  static async getCartByUserId(userId: string) {
    return prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
    });
  }
}
