import { Router } from "express";
import { DiscountController } from "../controllers/discountController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { discountValidator } from "../validators";
import validate from "../middlewares/validate";
import { authorizeRoles } from "../middlewares/rolesMiddleware";

const router = Router();
const PREFIX = "/discounts";

router.get(PREFIX, authenticateToken, DiscountController.getDiscounts);
router.get(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  DiscountController.getDiscountById,
);
router.post(
  PREFIX,
  authenticateToken,
  authorizeRoles(["admin"]),
  discountValidator,
  validate,
  DiscountController.createDiscount,
);
router.put(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  discountValidator,
  validate,
  DiscountController.updateDiscount,
);
router.patch(
  `${PREFIX}/:id/activate`,
  authenticateToken,
  authorizeRoles(["admin"]),
  DiscountController.activateDiscount,
);
router.patch(
  `${PREFIX}/:id/deactivate`,
  authenticateToken,
  authorizeRoles(["admin"]),
  DiscountController.deactivateDiscount,
);
router.delete(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  DiscountController.deleteDiscount,
);

export default router;
