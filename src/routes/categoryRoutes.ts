import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { entityNameValidator } from "../validators";
import validate from "../middlewares/validate";

const router = Router();
const PREFIX = "/categories";

router.get(PREFIX, authenticateToken, CategoryController.getCategories);
router.get(
  `${PREFIX}/:id`,
  authenticateToken,
  CategoryController.getCategoryById,
);
router.get(
  `${PREFIX}/name/:name`,
  authenticateToken,
  CategoryController.getCategoryByName,
);
router.post(
  PREFIX,
  authenticateToken,
  entityNameValidator,
  validate,
  CategoryController.createCategory,
);
router.put(
  `${PREFIX}/:id`,
  authenticateToken,
  entityNameValidator,
  validate,
  CategoryController.updateCategory,
);
router.put(
  `${PREFIX}/activate/:id`,
  authenticateToken,
  CategoryController.activateCategory,
);
router.put(
  `${PREFIX}/deactivate/:id`,
  authenticateToken,
  CategoryController.deactivateCategory,
);
router.delete(
  `${PREFIX}/:id`,
  authenticateToken,
  CategoryController.deleteCategory,
);

export default router;
