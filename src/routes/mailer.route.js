import { Router } from "express";
import { EmailController } from "../controllers/email.controller";
import nodemailer from "nodemailer"
import { isAuth } from "../middleware/isAuth";

export const mailerRoute = Router()
const emailController = new EmailController({ trasnporter: nodemailer })

mailerRoute.post("/email-sender", isAuth, emailController.sendMail)
