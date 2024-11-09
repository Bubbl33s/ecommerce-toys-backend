import { Router } from "express";
import { OrderController } from "../controllers/orderController";
import { orderStatusValidator } from "../validators";
import validate from "../middlewares/validate";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/rolesMiddleware";

const router = Router();
const PREFIX = "/orders";

router.get(
  PREFIX,
  authenticateToken,
  authorizeRoles(["admin", "user"]),
  OrderController.getOrders,
);
router.get(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin", "user"]),
  OrderController.getOrderById,
);
router.get(
  `${PREFIX}/user/:userId`,
  authenticateToken,
  authorizeRoles(["admin", "user"]),
  OrderController.getOrdersByUserId,
);
// router.post(
//   "/user/:userId",
//   authenticateToken,
//   authorizeRoles(["admin", "user"]),
//   OrderController.createOrderFromUserCart,
// );
router.patch(
  `${PREFIX}/:id/status`,
  authenticateToken,
  authorizeRoles(["admin"]),
  orderStatusValidator,
  validate,
  OrderController.updateOrderStatus,
);

export default router;
