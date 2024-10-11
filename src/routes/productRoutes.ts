import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/rolesMiddleware";

const router = Router();
const PREFIX = "/products";

router.get(PREFIX, ProductController.getProducts);
router.get(`${PREFIX}/:id`, ProductController.getProductById);
router.post(
  PREFIX,
  // authenticateToken,
  // authorizeRoles(["admin"]),
  ProductController.createProduct,
);

export default router;
