import express from "express";
import setupRoutes from "./routes";
import setupExpress from "./config/express";

const app = express();
setupExpress(app);
setupRoutes(app);

export default app;
