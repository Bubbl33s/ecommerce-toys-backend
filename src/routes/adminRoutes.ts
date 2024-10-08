import { Router } from "express";
import { AdminController } from "../controllers/adminController";
import { AuthController } from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();
const PREFIX = "/admins";

router.get(PREFIX, authenticateToken, AdminController.getAdmins);
router.get(`${PREFIX}/:id`, authenticateToken, AdminController.getAdminById);
router.get(
  `${PREFIX}/email/:email`,
  authenticateToken,
  AdminController.getAdminByEmail,
);
router.get(
  `${PREFIX}/username/:username`,
  authenticateToken,
  AdminController.getAdminByUsername,
);
router.post(PREFIX, AdminController.createAdmin);
router.put(`${PREFIX}/:id`, authenticateToken, AdminController.updateAdmin);
router.put(
  `${PREFIX}/password/:id`,
  authenticateToken,
  AdminController.updatePassword,
);
router.put(
  `${PREFIX}/activate/:id`,
  authenticateToken,
  AdminController.activateAdmin,
);
router.put(
  `${PREFIX}/deactivate/:id`,
  authenticateToken,
  AdminController.deactivateAdmin,
);
router.delete(`${PREFIX}/:id`, authenticateToken, AdminController.deleteAdmin);

router.post(`${PREFIX}/login`, AuthController.adminLogin);

export default router;
