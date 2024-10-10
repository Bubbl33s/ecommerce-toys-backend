import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { entityNameValidator } from "../validators";
import validate from "../middlewares/validate";
import { authorizeRoles } from "../middlewares/rolesMiddleware";

const router = Router();
const PREFIX = "/categories";

router.get(PREFIX, authenticateToken, CategoryController.getCategories);
router.get(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  CategoryController.getCategoryById,
);
router.get(
  `${PREFIX}/name/:name`,
  authenticateToken,
  authorizeRoles(["admin"]),
  CategoryController.getCategoryByName,
);
router.post(
  PREFIX,
  authenticateToken,
  authorizeRoles(["admin"]),
  entityNameValidator,
  validate,
  CategoryController.createCategory,
);
router.put(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  entityNameValidator,
  validate,
  CategoryController.updateCategory,
);
router.patch(
  `${PREFIX}/:id/activate`,
  authenticateToken,
  authorizeRoles(["admin"]),
  CategoryController.activateCategory,
);
router.patch(
  `${PREFIX}/:id/deactivate`,
  authenticateToken,
  authorizeRoles(["admin"]),
  CategoryController.deactivateCategory,
);
router.delete(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  CategoryController.deleteCategory,
);

export default router;
