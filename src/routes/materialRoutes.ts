import { Router } from "express";
import { MaterialController } from "../controllers/materialController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { entityNameValidator } from "../validators";
import validate from "../middlewares/validate";
import { authorizeRoles } from "../middlewares/rolesMiddleware";

const router = Router();
const PREFIX = "/materials";

router.get(PREFIX, authenticateToken, MaterialController.getMaterials);
router.get(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  MaterialController.getMaterialById,
);
router.get(
  `${PREFIX}/name/:name`,
  authenticateToken,
  authorizeRoles(["admin"]),
  MaterialController.getMaterialByName,
);
router.post(
  PREFIX,
  authenticateToken,
  authorizeRoles(["admin"]),
  entityNameValidator,
  validate,
  MaterialController.createMaterial,
);
router.put(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  entityNameValidator,
  validate,
  MaterialController.updateMaterial,
);
router.patch(
  `${PREFIX}/:id/activate`,
  authenticateToken,
  authorizeRoles(["admin"]),
  MaterialController.activateMaterial,
);
router.patch(
  `${PREFIX}/:id/deactivate`,
  authenticateToken,
  authorizeRoles(["admin"]),
  MaterialController.deactivateMaterial,
);
router.delete(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  MaterialController.deleteMaterial,
);

export default router;
