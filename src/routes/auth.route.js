import { Router } from "express";
import { UserController } from "../controllers/auth.controller.js";
import { serverNeonDB } from "../../neon/neonDbConfig.js";
// import { pgLocalDB } from "../dbConfig.js";
import { isAuth } from "../middleware/isAuth.js";
import { CommentsController } from "../controllers/comments.controller.js";

export const authRouter = Router();
// This allows that if tomorrow you change the DB, you only pass another instance without touching the internal logic of the controller.
const userController = new UserController({ authDb: serverNeonDB }); // <- We inject the NeonDB server-less dependency
//const userController = new UserController({ authDb: pgLocalDB }) //<- if we want to use the pgAdmin DB
const commentsControlller = new CommentsController({ authDB: serverNeonDB })

authRouter.get("/users", userController.getAllUsers)
authRouter.get("/user/:id", userController.getUserById)
authRouter.post("/login", userController.userLogin);
authRouter.post("/signup", userController.createUser);
authRouter.put("/update/user", isAuth, userController.updateUser)
authRouter.delete("/delete/user/:id", isAuth, userController.deleteUser)
authRouter.get("/logout", isAuth, userController.userLogout)
authRouter.get("/profile", isAuth, userController.userProfile)
authRouter.patch("/update/user/password", isAuth, userController.updatePassword)
authRouter.get("/comments", isAuth, commentsControlller.getAllCommets)