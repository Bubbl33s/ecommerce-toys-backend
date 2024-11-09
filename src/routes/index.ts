import { Application } from "express";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";
import categoryRoutes from "./categoryRoutes";
import brandRoutes from "./brandRoutes";
import materialRoutes from "./materialRoutes";
import discountRoutes from "./discountRoutes";
import productRoutes from "./productRoutes";
import imageRoutes from "./imageRoutes";
import cartRoutes from "./cartRoutes";
import paymentRoutes from "./paymentRoutes";
import orderRoutes from "./orderRoutes";

export default function setupRoutes(app: Application) {
  app.get("/", (_, res) => {
    res.redirect("/api/docs");
  });

  const API_PREFIX = "/api";

  app.use(API_PREFIX, userRoutes);
  app.use(API_PREFIX, adminRoutes);
  app.use(API_PREFIX, categoryRoutes);
  app.use(API_PREFIX, brandRoutes);
  app.use(API_PREFIX, materialRoutes);
  app.use(API_PREFIX, discountRoutes);
  app.use(API_PREFIX, productRoutes);
  app.use(API_PREFIX, imageRoutes);
  app.use(API_PREFIX, cartRoutes);
  app.use(API_PREFIX, paymentRoutes);
  app.use(API_PREFIX, orderRoutes);
}
