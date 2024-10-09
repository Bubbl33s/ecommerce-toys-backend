import express, { Request, Response } from "express";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import categoryRoutes from "./routes/categoryRoutes";

import cors from "cors";

const app = express();
const port = 3000;
const API_PREFIX = "/api";

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(API_PREFIX, productRoutes);
app.use(API_PREFIX, userRoutes);
app.use(API_PREFIX, adminRoutes);
app.use(API_PREFIX, categoryRoutes);

app.get("/", (_: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
