// Modulo solo para las rutas

import { Router } from "express";

const router = Router();

import { 
    getProducts, 
    getProductById, 
    createProduct, 
    deleteProduct
 } from "../controllers/products.controllers.js";


router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

export default router;

