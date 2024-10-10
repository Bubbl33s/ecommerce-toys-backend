import { Router } from "express";
import { BrandController } from "../controllers/brandController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { entityNameValidator } from "../validators";
import validate from "../middlewares/validate";

const router = Router();
const PREFIX = "/brands";

router.get(PREFIX, authenticateToken, BrandController.getBrands);
router.get(`${PREFIX}/:id`, authenticateToken, BrandController.getBrandById);
router.get(
  `${PREFIX}/name/:name`,
  authenticateToken,
  BrandController.getBrandByName,
);
router.post(
  PREFIX,
  authenticateToken,
  entityNameValidator,
  validate,
  BrandController.createBrand,
);
router.put(
  `${PREFIX}/:id`,
  authenticateToken,
  entityNameValidator,
  validate,
  BrandController.updateBrand,
);
router.patch(
  `${PREFIX}/:id/activate`,
  authenticateToken,
  BrandController.activateBrand,
);
router.patch(
  `${PREFIX}/:id/deactivate`,
  authenticateToken,
  BrandController.deactivateBrand,
);
router.delete(`${PREFIX}/:id`, authenticateToken, BrandController.deleteBrand);

export default router;
