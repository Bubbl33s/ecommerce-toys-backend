import express from "express";
import setupRoutes from "./routes";
import setupExpress from "./config/express";
import errorHandler from "./middlewares/errorHandler";

const app = express();
setupExpress(app);
setupRoutes(app);
app.use(errorHandler);

export default app;
