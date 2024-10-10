import { Application } from "express";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";
import categoryRoutes from "./categoryRoutes";
import brandRoutes from "./brandRoutes";
import materialRoutes from "./materialRoutes";
import discountRoutes from "./discountRoutes";

export default function setupRoutes(app: Application) {
  const API_PREFIX = "/api";

  app.use(API_PREFIX, userRoutes);
  app.use(API_PREFIX, adminRoutes);
  app.use(API_PREFIX, categoryRoutes);
  app.use(API_PREFIX, brandRoutes);
  app.use(API_PREFIX, materialRoutes);
  app.use(API_PREFIX, discountRoutes);
}
