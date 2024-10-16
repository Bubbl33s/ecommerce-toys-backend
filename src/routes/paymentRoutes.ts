import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";

const router = Router();
const PREFIX = "/payment";

router.post(`${PREFIX}/:id`, PaymentController.createPaymentFromUserCart);
router.get(`${PREFIX}/success/:id`, PaymentController.paymentSuccess);
router.get(`${PREFIX}/failure`, PaymentController.paymentFailure);

export default router;
