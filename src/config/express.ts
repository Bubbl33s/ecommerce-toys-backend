import express, { Application } from "express";

import cors from "cors";

export default function setupExpress(app: Application) {
  const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  };

  app.use(cors(corsOptions));
  app.use(express.json());
}
