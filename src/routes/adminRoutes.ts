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
import { authorizeRoles } from "../middlewares/rolesMiddleware";
import { uploadAdminImage } from "../middlewares/multerConfig";

const router = Router();
const PREFIX = "/admins";

router.get(
  PREFIX,
  authenticateToken,
  authorizeRoles(["admin"]),
  AdminController.getAdmins,
);
router.get(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  AdminController.getAdminById,
);
router.get(
  `${PREFIX}/email/:email`,
  authenticateToken,
  authorizeRoles(["admin"]),
  emailValidator,
  validate,
  AdminController.getAdminByEmail,
);
router.get(
  `${PREFIX}/username/:username`,
  authenticateToken,
  authorizeRoles(["admin"]),
  usernameValidator,
  validate,
  AdminController.getAdminByUsername,
);
router.post(
  PREFIX,
  authenticateToken,
  authorizeRoles(["admin"]),
  createAdminValidator,
  validate,
  AdminController.createAdmin,
);
router.put(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  updateAdminValidator,
  validate,
  AdminController.updateAdmin,
);
router.patch(
  `${PREFIX}/:id/password`,
  authenticateToken,
  authorizeRoles(["admin"]),
  passwordValidator,
  validate,
  AdminController.updatePassword,
);
router.patch(
  `${PREFIX}/:id/image`,
  authenticateToken,
  authorizeRoles(["admin"]),
  uploadAdminImage.single("image"),
  AdminController.updateAdminImage,
);
router.patch(
  `${PREFIX}/:id/image-delete`,
  authenticateToken,
  authorizeRoles(["admin"]),
  AdminController.deleteAdminImage,
);
router.patch(
  `${PREFIX}/:id/activate`,
  authenticateToken,
  authorizeRoles(["admin"]),
  AdminController.activateAdmin,
);
router.patch(
  `${PREFIX}/:id/deactivate`,
  authenticateToken,
  authorizeRoles(["admin"]),
  AdminController.deactivateAdmin,
);
router.delete(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  AdminController.deleteAdmin,
);

router.post(`${PREFIX}/login`, AuthController.adminLogin);

export default router;
