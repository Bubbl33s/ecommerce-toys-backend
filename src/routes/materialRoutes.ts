import { Router } from "express";
import { MaterialController } from "../controllers/materialController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { entityNameValidator } from "../validators";
import validate from "../middlewares/validate";

const router = Router();
const PREFIX = "/materials";

router.get(PREFIX, authenticateToken, MaterialController.getMaterials);
router.get(
  `${PREFIX}/:id`,
  authenticateToken,
  MaterialController.getMaterialById,
);
router.get(
  `${PREFIX}/name/:name`,
  authenticateToken,
  MaterialController.getMaterialByName,
);
router.post(
  PREFIX,
  authenticateToken,
  entityNameValidator,
  validate,
  MaterialController.createMaterial,
);
router.put(
  `${PREFIX}/:id`,
  authenticateToken,
  entityNameValidator,
  validate,
  MaterialController.updateMaterial,
);
router.patch(
  `${PREFIX}/:id/activate`,
  authenticateToken,
  MaterialController.activateMaterial,
);
router.patch(
  `${PREFIX}/:id/deactivate`,
  authenticateToken,
  MaterialController.deactivateMaterial,
);
router.delete(
  `${PREFIX}/:id`,
  authenticateToken,
  MaterialController.deleteMaterial,
);

export default router;
