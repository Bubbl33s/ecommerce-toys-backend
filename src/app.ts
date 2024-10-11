import express from "express";
import setupRoutes from "./routes";
import setupExpress from "./config/express";
import errorHandler from "./middlewares/errorHandler";
import path from "path";
import { fileURLToPath } from "url";

// Obtener la ruta actual utilizando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
setupExpress(app);
// Servir la carpeta uploads de forma estática
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
setupRoutes(app);
app.use(errorHandler);

export default app;
