import app from "./app";
import { swaggerDocs } from "./config/swagger";

const PORT = process.env.PORT ?? "9090";

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
  swaggerDocs(app, parseInt(PORT));
});
