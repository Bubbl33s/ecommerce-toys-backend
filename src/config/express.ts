import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

export default function setupExpress(app: Application) {
  const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  };

  app.use(cors(corsOptions));
  app.use(express.json());

  app.use(helmet());
  app.use(compression());
  app.use(morgan("dev"));
}
