import app from "./app";
import { swaggerDocs } from "./config/swagger";

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  swaggerDocs(app, port);
});
