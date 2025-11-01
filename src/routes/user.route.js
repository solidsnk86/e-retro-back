import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { serverNeonDB } from "../../neon/neonDbConfig.js";
import { isAuth } from "../middleware/isAuth.js";

export const userRouter = Router()
const userController = new UserController({ userDb: serverNeonDB })

userRouter.get("/users", userController.getAllUsers)
userRouter.get("/user/profile", userController.userProfile)
userRouter.get("/user/:id", userController.getUserById)
userRouter.put("/update/user", isAuth, userController.updateUser)
userRouter.patch("/update/user/password", isAuth, userController.updatePassword)