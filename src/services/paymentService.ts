import { MercadoPagoConfig, Preference } from "mercadopago";
import { CartService } from "./cartService";
import prisma from "./prisma";
import axios from "axios";
import { OrderService } from "./orderService";
import dotenv from "dotenv";

dotenv.config();

export class PaymentService {
  private static API_KEY = process.env.MERCADOPAGO_API_KEY;

  private static client = new MercadoPagoConfig({
    accessToken: PaymentService.API_KEY!,
  });

  private static preference = new Preference(PaymentService.client);

  static {
    if (!PaymentService.API_KEY) {
      throw new Error("MERCADOPAGO_API_KEY is not defined");
    }
  }

  static async createPaymentFromUserCart(userId: string) {
    const userCart = await CartService.getCartByUserId(userId);

    if (!userCart) {
      throw new Error("No existe un carrito para ese usuario");
    }

    if (userCart.items.length === 0) {
      throw new Error("El carrito está vacío");
    }

    // Get items from cart
    const items = await Promise.all(
      userCart.items.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error("No se encontró el producto");
        }

        let discountValue = 0;

        if (product.discountId) {
          const discount = await prisma.discount.findUnique({
            where: { id: product.discountId },
          });

          if (!discount) {
            throw new Error("No se encontró el descuento");
          }

          discountValue = discount.discount;
        }

        const unit_price = product.price * (1 - discountValue);

        return {
          id: product.id,
          title: product.name,
          category_id: product.id,
          quantity: item.quantity,
          unit_price,
          currency_id: "PEN",
        };
      }),
    );

    try {
      const preference = await PaymentService.preference.create({
        body: {
          payment_methods: {
            excluded_payment_methods: [],
            excluded_payment_types: [],
            installments: 6,
          },
          items,
          auto_return: "approved",
          back_urls: {
            // Cambiar con la url de deploy del frontend
            success: "https://e-commerce-toy-store.vercel.app/paymentsuccess",
            // failure: `${process.env.DEPLOY_URL}api/payment/failure`,
          },
          payer: {
            name: userId,
          },
          // External_reference con el userId
          external_reference: userId,
        },
      });

      return preference.init_point;
    } catch (error) {
      throw new Error("Error al crear la preferencia de pago");
    }
  }

  static async handleWebhook(paymentId: string) {
    const MERCADO_PAGO_API_URL = "https://api.mercadopago.com/v1/payments";

    console.log("Payment received ID", paymentId);

    try {
      const response = await axios.get(`${MERCADO_PAGO_API_URL}/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${PaymentService.API_KEY}`,
        },
      });

      await OrderService.createOrderFromUserCart(
        response.data.external_reference,
      );

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        throw new Error(error.message);
      } else {
        console.error("An unknown error occurred");
        throw new Error("An unknown error occurred");
      }
    }
  }
}
