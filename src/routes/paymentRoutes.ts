import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";

const router = Router();

router.post(`/payment/:id`, PaymentController.createPaymentFromUserCart);
router.post(`/payment-webhook`, PaymentController.handleWebhook);

export default router;
