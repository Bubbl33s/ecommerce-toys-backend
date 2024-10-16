import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};

export const sendAccountConfirmationEmail = async (
  to: string,
  token: string,
) => {
  // Cambiar la URL de producción
  const verificationUrl = `${process.env.DEPLOY_URL}/api/users/verify/${token}`;

  const subject = "Confirma tu cuenta";
  const html = `
    <h2>Juguetitos</h2>
    <h3>¡Bienvenido a nuestra tienda!</h3>
    <p>Por favor, confirma tu cuenta haciendo click <a target="_blank" href="${verificationUrl}">aquí</a></p>
  `;

  await sendEmail(to, subject, html);
};

type orderData = {
  product: string;
  quantity: number;
  price: number;
  totalAmount: any;
};

export const sendOrderConfirmationEmail = async (
  to: string,
  orderId: string,
  order: orderData[],
) => {
  const subject = "Confirmación de orden";
  const html = `
    <h1>¡Gracias por tu orden!</h1>
    <p>Tu orden con el ID ${orderId} ha sido recibida.</p>
    <h2>Detalles de la orden:</h2>
    <ul>
      ${order
        .map(
          (item) => `
          <li>
            <p>Producto: ${item.product}</p>
            <p>Cantidad: ${item.quantity}</p>
            <p>Precio: ${item.price}</p>
            <p>Total: ${item.totalAmount}</p>
          </li>
        `,
        )
        .join("")}

  `;

  await sendEmail(to, subject, html);
};
