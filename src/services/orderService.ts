import { CartService } from "./cartService";
import prisma from "./prisma";

export class OrderService {
  static async getOrders() {
    return await prisma.order.findMany({
      include: {
        items: true,
      },
    });
  }

  static async getOrderById(id: string) {
    return await prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        items: true,
      },
    });
  }

  static async getOrdersByUserId(userId: string) {
    return await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        items: true,
      },
    });
  }

  static async createOrderFromUserCart(userId: string) {
    const userCart = await CartService.getCartByUserId(userId);

    if (!userCart) {
      throw new Error("No existe un carrito para ese usuario");
    }

    if (userCart.items.length === 0) {
      throw new Error("El carrito está vacío");
    }

    return prisma.$transaction(async (prismaTx) => {
      try {
        const order = await prismaTx.order.create({
          data: {
            userId: userId,
            status: "Pendiente",
          },
          include: {
            items: true,
          },
        });

        let totalOrderAmount = 0;

        await Promise.all(
          userCart.items.map(async (item) => {
            const product = await prismaTx.product.findUnique({
              where: { id: item.productId },
            });

            if (!product) {
              throw new Error("No se encontró el producto");
            }

            await prismaTx.orderItem.create({
              data: {
                orderId: order.id,
                productId: product.id,
                quantity: item.quantity,
                lockedPrice: product.price,
                totalAmount: product.price * item.quantity,
              },
            });

            totalOrderAmount += product.price * item.quantity;
          }),
        );

        await prismaTx.order.update({
          where: { id: order.id },
          data: { totalAmount: totalOrderAmount },
        });

        await CartService.clearUserCart(userId);

        return order;
      } catch (error) {
        throw new Error(`No se pudo crear la orden`);
      }
    });
  }

  static async updateOrderStatus(id: string, status: string) {
    const orderExists = await this.getOrderById(id);

    if (!orderExists) {
      throw new Error("No existe una orden con ese ID");
    }

    return prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}
