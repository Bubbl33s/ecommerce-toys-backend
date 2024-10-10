import { Router } from "express";
import { AdminController } from "../controllers/adminController";
import { AuthController } from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";
import {
  emailValidator,
  usernameValidator,
  passwordValidator,
} from "../validators/base";
import {
  createAdminValidator,
  updateAdminValidator,
} from "../validators/adminValidations";
import validate from "../middlewares/validate";

const router = Router();
const PREFIX = "/admins";

router.get(PREFIX, authenticateToken, AdminController.getAdmins);
router.get(`${PREFIX}/:id`, authenticateToken, AdminController.getAdminById);
router.get(
  `${PREFIX}/email/:email`,
  authenticateToken,
  emailValidator,
  validate,
  AdminController.getAdminByEmail,
);
router.get(
  `${PREFIX}/username/:username`,
  authenticateToken,
  usernameValidator,
  validate,
  AdminController.getAdminByUsername,
);
router.post(
  PREFIX,
  authenticateToken,
  createAdminValidator,
  validate,
  AdminController.createAdmin,
);
router.put(
  `${PREFIX}/:id`,
  authenticateToken,
  updateAdminValidator,
  validate,
  AdminController.updateAdmin,
);
router.patch(
  `${PREFIX}/:id/password`,
  authenticateToken,
  passwordValidator,
  validate,
  AdminController.updatePassword,
);
router.patch(
  `${PREFIX}/:id/activate`,
  authenticateToken,
  AdminController.activateAdmin,
);
router.patch(
  `${PREFIX}/:id/deactivate`,
  authenticateToken,
  AdminController.deactivateAdmin,
);
router.delete(`${PREFIX}/:id`, authenticateToken, AdminController.deleteAdmin);

router.post(`${PREFIX}/login`, AuthController.adminLogin);

export default router;
