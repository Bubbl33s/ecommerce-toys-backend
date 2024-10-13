import { Application, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import YAML from "yamljs";

// Crear __dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(path.join(__dirname, "../docs/openapi.yaml"));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Toys Ecommerce API with Swagger",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger for an Ecommerce website that sells toys. Make it Real Bootcamp",
    },
  },
  apis: ["src/routes/*.ts"],
};

const specs = swaggerJSDoc(options);

export const swaggerDocs = (app: Application, port: number) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get("/api/docs.json", (_, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });

  console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
};
