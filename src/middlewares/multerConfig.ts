import multer from "multer";
import path from "path";

const storageProductImg = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/productImages/");
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const storageUserImg = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/userImages/");
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const storageAdminImg = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/adminImages/");
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const uploadProductImage = multer({ storage: storageProductImg });
export const uploadUserImage = multer({ storage: storageUserImg });
export const uploadAdminImage = multer({ storage: storageAdminImg });
