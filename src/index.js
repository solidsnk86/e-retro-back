import express from "express";
import { tasksRouter } from "./routes/tasks.route.js";
import { authRouter } from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { aiRoute } from "./routes/ai.route.js";

if (process.env.NODE_ENV !== "production") {
  process.loadEnvFile(".env");
}

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.disable("x-powered-by");

app.use("/api", tasksRouter);
app.use("/api", authRouter);
app.use("/api", aiRoute)

export default app;

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT ?? 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
  });
}
