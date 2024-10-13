import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/rolesMiddleware";
import { productValidator, quantityValidator } from "../validators";
import validate from "../middlewares/validate";

const router = Router();
const PREFIX = "/products";

router.get(PREFIX, ProductController.getProducts);
router.get(`${PREFIX}/:id`, ProductController.getProductById);
router.post(
  PREFIX,
  authenticateToken,
  authorizeRoles(["admin"]),
  productValidator,
  validate,
  ProductController.createProduct,
);
router.put(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  productValidator,
  validate,
  ProductController.updateProduct,
);
router.patch(
  `${PREFIX}/:id/stock`,
  authenticateToken,
  authorizeRoles(["admin"]),
  quantityValidator,
  validate,
  ProductController.updateProductStock,
);
router.patch(
  `${PREFIX}/:id/activate`,
  authenticateToken,
  authorizeRoles(["admin"]),
  ProductController.activateProduct,
);
router.patch(
  `${PREFIX}/:id/deactivate`,
  authenticateToken,
  authorizeRoles(["admin"]),
  ProductController.deactivateProduct,
);
router.delete(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  ProductController.deactivateProduct,
);

export default router;
