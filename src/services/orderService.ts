import { CartService } from "./cartService";
import { sendOrderConfirmationEmail } from "../utilities";
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

            let discountValue = 0;

            if (!product) {
              throw new Error("No se encontró el producto");
            } else {
              if (product.discountId) {
                const discount = await prismaTx.discount.findUnique({
                  where: { id: product.discountId },
                });

                if (!discount) {
                  throw new Error("No se encontró el descuento");
                }

                discountValue = discount.discount;
              }
            }

            const lockedPrice = product.price * (1 - discountValue);

            await prismaTx.orderItem.create({
              data: {
                orderId: order.id,
                productId: product.id,
                quantity: item.quantity,
                lockedPrice,
                totalAmount: lockedPrice * item.quantity,
              },
            });

            totalOrderAmount += lockedPrice * item.quantity;

            await prismaTx.product.update({
              where: { id: product.id },
              data: { stock: product.stock - item.quantity },
            });
          }),
        );

        await prismaTx.order.update({
          where: { id: order.id },
          data: { totalAmount: totalOrderAmount },
        });

        await CartService.clearUserCart(userId);

        // Send order confirmation email
        await this.sendOrderConfirmationEmail(userId, order.id);

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

  static async sendOrderConfirmationEmail(orderId: string, userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("No se encontró al usuario");
    }

    const order = await this.getOrderById(orderId);

    if (!order) {
      throw new Error("No se encontró la orden");
    }

    let orderData: {
      product: string;
      quantity: number;
      price: number;
      totalAmount: number;
    }[] = [];

    await Promise.all(
      order.items.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error("No se encontró el producto");
        }

        orderData.push({
          product: product.name,
          quantity: item.quantity,
          price: item.lockedPrice,
          totalAmount: item.totalAmount,
        });
      }),
    ),
      await sendOrderConfirmationEmail(user.email, orderId, orderData);
  }
}
