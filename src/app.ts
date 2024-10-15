import express from "express";
import setupRoutes from "./routes";
import setupExpress from "./config/express";
import errorHandler from "./middlewares/errorHandler";
import path from "path";

const app = express();
setupExpress(app);
// Servir la carpeta uploads de forma estática
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
setupRoutes(app);
app.use(errorHandler);

export default app;
