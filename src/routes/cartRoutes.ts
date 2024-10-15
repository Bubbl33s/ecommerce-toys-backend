import { Router } from "express";
import { CartController } from "../controllers/cartController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/rolesMiddleware";
import { addItemCartValidator, quantityValidator } from "../validators";
import validate from "../middlewares/validate";

const router = Router();
const PREFIX = "/carts";

router.get(`${PREFIX}/:id`, CartController.getCartById);
router.get(`${PREFIX}/user/:userId`, CartController.getCartByUserId);
router.post(
  `${PREFIX}/item`,
  authenticateToken,
  authorizeRoles(["admin", "user"]),
  addItemCartValidator,
  validate,
  CartController.addCartItem,
);
router.patch(
  `${PREFIX}/item/:cartItemId`,
  authenticateToken,
  authorizeRoles(["admin", "user"]),
  quantityValidator,
  validate,
  CartController.updateCartItemQuantity,
);
router.delete(
  `${PREFIX}/item/:cartItemId`,
  authorizeRoles(["admin", "user"]),
  authenticateToken,
  CartController.deleteCartItem,
);

export default router;
