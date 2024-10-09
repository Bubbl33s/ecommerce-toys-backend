import { Router } from "express";
import { BrandController } from "../controllers/brandController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();
const PREFIX = "/brands";

router.get(PREFIX, authenticateToken, BrandController.getBrands);
router.get(`${PREFIX}/:id`, authenticateToken, BrandController.getBrandById);
router.get(
  `${PREFIX}/name/:name`,
  authenticateToken,
  BrandController.getBrandByName,
);
router.post(PREFIX, authenticateToken, BrandController.createBrand);
router.put(`${PREFIX}/:id`, authenticateToken, BrandController.updateBrand);
router.put(
  `${PREFIX}/activate/:id`,
  authenticateToken,
  BrandController.activateBrand,
);
router.put(
  `${PREFIX}/deactivate/:id`,
  authenticateToken,
  BrandController.deactivateBrand,
);
router.delete(`${PREFIX}/:id`, authenticateToken, BrandController.deleteBrand);

export default router;
