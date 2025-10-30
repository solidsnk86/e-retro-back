import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { serverNeonDB } from "../../neon/neonDbConfig.js";
// import { pgLocalDB } from "../dbConfig.js";
import { isAuth } from "../middleware/isAuth.js";

export const authRouter = Router();
// Esto permite que si mañana cambias la DB, solo pases otra instancia sin tocar la lógica interna del controlador.
const authController = new AuthController({ authDb: serverNeonDB }); // <- Inyectamos la dependencia de NeonDB server-less
// const authController = new AuthController({ authDb: pgLocalDB }) <- si queremos usar la DB de pgAdmin

authRouter.post("/login", authController.userLogin);
authRouter.post("/signup", authController.createUser);
authRouter.get("/logout", isAuth, authController.userLogout)