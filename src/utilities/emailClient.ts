import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smpt.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
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
  const verificationUrl = `${process.env.DEPLOY_URL}/api/users/verify/${token}`;

  const subject = "Confirma tu cuenta";
  const html = `
    <h2>Juguetitos</h2>
    <h3>¡Bienvenido a nuestra tienda!</h3>
    <p>Por favor, confirma tu cuenta haciendo click <a target="_blank" href="${verificationUrl}">aquí</a></p>
  `;

  await sendEmail(to, subject, html);
};

export const sendOrderConfirmationEmail = async (
  to: string,
  orderId: string,
) => {
  const subject = "Confirmación de orden";
  const html = `
    <h1>¡Gracias por tu orden!</h1>
    <p>Tu orden con el ID ${orderId} ha sido recibida.</p>
  `;

  await sendEmail(to, subject, html);
};
