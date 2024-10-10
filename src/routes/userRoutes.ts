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

const router = Router();
const PREFIX = "/users";

router.get(PREFIX, authenticateToken, UserController.getUsers);
router.get(`${PREFIX}/:id`, authenticateToken, UserController.getUserById);
router.get(
  `${PREFIX}/email/:email`,
  emailValidator,
  validate,
  authenticateToken,
  UserController.getUserByEmail,
);
router.post(PREFIX, createUserValidator, validate, UserController.createUser);
router.put(
  `${PREFIX}/:id`,
  updateUserValidator,
  validate,
  authenticateToken,
  UserController.updateUser,
);
router.put(
  `${PREFIX}/password/:id`,
  authenticateToken,
  passwordValidator,
  validate,
  UserController.updatePassword,
);
router.put(
  `${PREFIX}/activate/:id`,
  authenticateToken,
  UserController.activateUser,
);
router.put(
  `${PREFIX}/deactivate/:id`,
  authenticateToken,
  UserController.deactivateUser,
);
router.delete(`${PREFIX}/:id`, authenticateToken, UserController.deleteUser);

router.post(`${PREFIX}/login`, AuthController.userLogin);

export default router;
