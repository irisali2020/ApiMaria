// Modulo solo para las rutas

import { Router } from "express";

const router = Router();

import { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct,
    deleteProduct
 } from "../controllers/products.controllers.js";

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);

router.put('/:id', updateProduct);

router.delete("/:id", deleteProduct);

export default router;

