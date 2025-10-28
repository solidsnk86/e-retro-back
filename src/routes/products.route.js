import { Router } from "express";
import { ProductController } from "../controllers/products.controller.js";
import { serverNeonDB } from "../../neon/neonDbConfig.js";

export const productsRoute = Router();

const productController = new ProductController({ productsDB: serverNeonDB });

// Obtener todos los productos
productsRoute.get("/products", productController.getAllProducts);

// Obtener un producto por ID
productsRoute.get("/product/:id", productController.getProductById);

// Crear un nuevo producto
productsRoute.post("/products", productController.createProduct);

// Actualizar un producto existente
productsRoute.put("/product/:id", productController.updateProduct);

// Eliminar un producto
productsRoute.delete("/product/:id", productController.deleteProduct);
