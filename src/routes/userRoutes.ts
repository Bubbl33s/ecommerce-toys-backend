import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const PREFIX = "/users";

router.get(PREFIX, UserController.getUsers);
router.get(`${PREFIX}/:id`, UserController.getUserById);
router.get(`${PREFIX}/email/:email`, UserController.getUserByEmail);
router.post(PREFIX, UserController.createUser);
router.put(`${PREFIX}/:id`, UserController.updateUser);
router.delete(`${PREFIX}/:id`, UserController.deleteUser);

export default router;
