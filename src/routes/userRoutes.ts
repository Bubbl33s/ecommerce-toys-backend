import { Router } from "express";
import { UserController } from "../controllers/userController";
import { AuthController } from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();
const PREFIX = "/users";

router.get(PREFIX, authenticateToken, UserController.getUsers);
router.get(`${PREFIX}/:id`, authenticateToken, UserController.getUserById);
router.get(
  `${PREFIX}/email/:email`,
  authenticateToken,
  UserController.getUserByEmail,
);
router.post(PREFIX, UserController.createUser);
router.put(`${PREFIX}/:id`, authenticateToken, UserController.updateUser);
router.put(
  `${PREFIX}/password/:id`,
  authenticateToken,
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
