import { Router } from "express";
import { UserController } from "../controllers/userController";
import { AuthController } from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";
import {
  createUserValidator,
  updateUserValidator,
  emailValidator,
  passwordValidator,
} from "../validators";
import validate from "../middlewares/validate";
import { authorizeRoles } from "../middlewares/rolesMiddleware";

const router = Router();
const PREFIX = "/users";

router.get(
  PREFIX,
  authenticateToken,
  authorizeRoles(["admin"]),
  UserController.getUsers,
);
router.get(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  UserController.getUserById,
);
router.get(
  `${PREFIX}/email/:email`,
  emailValidator,
  validate,
  authenticateToken,
  authorizeRoles(["admin"]),
  UserController.getUserByEmail,
);
router.post(PREFIX, createUserValidator, validate, UserController.createUser);
router.put(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin", "user"]),
  updateUserValidator,
  validate,
  UserController.updateUser,
);
router.patch(
  `${PREFIX}/password/:id`,
  authenticateToken,
  authorizeRoles(["admin", "user"]),
  passwordValidator,
  validate,
  UserController.updatePassword,
);
router.patch(
  `${PREFIX}/:id/activate`,
  authenticateToken,
  authorizeRoles(["admin", "user"]),
  UserController.activateUser,
);
router.patch(
  `${PREFIX}/:id/deactivate`,
  authenticateToken,
  authorizeRoles(["admin", "user"]),
  UserController.deactivateUser,
);
router.delete(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  UserController.deleteUser,
);

router.post(`${PREFIX}/login`, AuthController.userLogin);

export default router;
