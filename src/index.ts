import express, { Request, Response } from "express";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";

import cors from "cors";

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", productRoutes);
app.use("/api", userRoutes);

app.get("/", (_: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
