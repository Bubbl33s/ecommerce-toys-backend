import prisma from "./prisma";

type AddCartItemData = {
  cartId: string;
  productId: string;
  quantity: number;
};

export class CartService {
  static async getCartById(id: string) {
    return prisma.cart.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  static async getCartByUserId(userId: string) {
    return prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
  }

  static async addCartItem({ cartId, productId, quantity }: AddCartItemData) {
    const cartExists = await this.getCartById(cartId);

    if (!cartExists) {
      throw new Error("No existe un carrito con ese ID");
    }

    // Check if the product is already in the cart
    const cartItemExists = await prisma.cartItem.findFirst({
      where: { cartId, productId },
    });

    if (cartItemExists) {
      return this.updateCartItemQuantity(cartItemExists.id, quantity);
    }

    return prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });
  }

  static async updateCartItemQuantity(cartItemId: string, quantity: number) {
    const cartItemExists = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItemExists) {
      throw new Error("No existe un item de carrito con ese ID");
    }

    return prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });
  }

  static async deleteCartItem(cartItemId: string) {
    const cartItemExists = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItemExists) {
      throw new Error("No existe un item de carrito con ese ID");
    }

    return prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }
}
