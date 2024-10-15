import { Router } from "express";
import { OrderController } from "../controllers/orderController";
import { orderStatusValidator } from "../validators";
import validate from "../middlewares/validate";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/rolesMiddleware";

const router = Router();

router.get(
  "/",
  authenticateToken,
  authorizeRoles(["admin"]),
  OrderController.getOrders,
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin", "user"]),
  OrderController.getOrderById,
);
router.get(
  "/user/:userId",
  authenticateToken,
  authorizeRoles(["admin", "user"]),
  OrderController.getOrdersByUserId,
);
router.post(
  "/user/:userId",
  authenticateToken,
  authorizeRoles(["admin", "user"]),
  OrderController.createOrderFromUserCart,
);
router.patch(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  orderStatusValidator,
  validate,
  OrderController.updateOrderStatus,
);

export default router;
