import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { entityNameValidator } from "../validators";
import validate from "../middlewares/validate";
import { authorizeRoles } from "../middlewares/rolesMiddleware";
import { uploadCategoryImage } from "../middlewares/multerConfig";

const router = Router();
const PREFIX = "/categories";

router.get(PREFIX, CategoryController.getCategories);
router.get(`${PREFIX}/:id`, CategoryController.getCategoryById);
router.get(`${PREFIX}/name/:name`, CategoryController.getCategoryByName);
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
  `${PREFIX}/:id/image`,
  authenticateToken,
  authorizeRoles(["admin"]),
  uploadCategoryImage.single("image"),
  CategoryController.updateCategoryImage,
);
router.patch(
  `${PREFIX}/:id/delete-image`,
  authenticateToken,
  authorizeRoles(["admin"]),
  CategoryController.deleteCategoryImage,
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
