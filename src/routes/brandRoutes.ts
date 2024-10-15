import { Router } from "express";
import { BrandController } from "../controllers/brandController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { entityNameValidator } from "../validators";
import validate from "../middlewares/validate";
import { authorizeRoles } from "../middlewares/rolesMiddleware";

const router = Router();
const PREFIX = "/brands";

router.get(PREFIX, BrandController.getBrands);
router.get(`${PREFIX}/:id`, BrandController.getBrandById);
router.get(`${PREFIX}/name/:name`, BrandController.getBrandByName);
router.post(
  PREFIX,
  authenticateToken,
  authorizeRoles(["admin"]),
  entityNameValidator,
  validate,
  BrandController.createBrand,
);
router.put(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  entityNameValidator,
  validate,
  BrandController.updateBrand,
);
router.patch(
  `${PREFIX}/:id/activate`,
  authenticateToken,
  authorizeRoles(["admin"]),
  BrandController.activateBrand,
);
router.patch(
  `${PREFIX}/:id/deactivate`,
  authenticateToken,
  authorizeRoles(["admin"]),
  BrandController.deactivateBrand,
);
router.delete(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  BrandController.deleteBrand,
);

export default router;
