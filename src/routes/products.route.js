import { Router } from "express";
import { ProductController } from "../controllers/products.controller.js";
import { serverNeonDB } from "../../neon/neonDbConfig.js";

export const productsRoute = Router()
const productController = new ProductController({ productsDB: serverNeonDB })

productsRoute.get("/products", productController.getAllProducts)