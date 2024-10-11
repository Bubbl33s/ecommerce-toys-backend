import { Router } from "express";
import { ImageController } from "../controllers/imageController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/rolesMiddleware";
import uploadProductImage from "../middlewares/multerConfig";

const router = Router();
const PREFIX = "/images";

router.get(PREFIX, ImageController.getImages);
router.get(`${PREFIX}/:id`, ImageController.getImageById);
router.get(
  `${PREFIX}/product/:productId`,
  ImageController.getImagesByProductId,
);
router.post(
  PREFIX,
  authenticateToken,
  authorizeRoles(["admin"]),
  uploadProductImage.single("image"),
  ImageController.createImage,
);
router.delete(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(["admin"]),
  ImageController.deleteImage,
);
