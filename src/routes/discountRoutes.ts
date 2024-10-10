import { Router } from "express";
import { DiscountController } from "../controllers/discountController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { discountValidator } from "../validators";
import validate from "../middlewares/validate";

const router = Router();
const PREFIX = "/discounts";

router.get(PREFIX, authenticateToken, DiscountController.getDiscounts);
router.get(
  `${PREFIX}/:id`,
  authenticateToken,
  DiscountController.getDiscountById,
);
router.post(
  PREFIX,
  authenticateToken,
  discountValidator,
  validate,
  DiscountController.createDiscount,
);
router.put(
  `${PREFIX}/:id`,
  authenticateToken,
  discountValidator,
  validate,
  DiscountController.updateDiscount,
);
router.patch(
  `${PREFIX}/:id/activate`,
  authenticateToken,
  DiscountController.activateDiscount,
);
router.patch(
  `${PREFIX}/:id/deactivate`,
  authenticateToken,
  DiscountController.deactivateDiscount,
);
router.delete(
  `${PREFIX}/:id`,
  authenticateToken,
  DiscountController.deleteDiscount,
);

export default router;
