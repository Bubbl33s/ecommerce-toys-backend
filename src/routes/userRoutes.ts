import { Router } from "express";
import { UserController } from "../controllers/userController";
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
router.delete(`${PREFIX}/:id`, authenticateToken, UserController.deleteUser);

export default router;
