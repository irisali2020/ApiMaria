// Controlador de los productos: tiene la logica

 

import { fetchProducts, getProductById as getProductByIdModel, createProduct as createProductModel, updateProduct as updateProductModel, deleteProduct as deleteProductModel,  } from "../models/Product.js"


export const getProducts = async (req, res) => {
    // 1. Capturamos la variable 'search' (y 'category' o 'page' si las necesitas) que viene de la URL del front
    const { search, category } = req.query;

    // 2. Le pasamos esas variables a tu modelo para que sepa qué buscar
    const products = await fetchProducts({ search, category }); 
    
    res.json(products);
};

export const getProductById = async (req, res) => {
    const { id } = req.params;

    const product =  await getProductByIdModel(id)

    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado", });
    }

    res.json(product);
};

export const createProduct = async (req, res) => {
    const { nombre, precio, categoria, imagen, vendido, condicion } = req.body;

    if (!nombre || !precio || !categoria || !imagen || vendido === undefined || !condicion) {
        return res.status(400).json({ message: "Todos los campos son obligatorios", });
    }

    const newProduct = await createProductModel({ nombre, precio, categoria, imagen, vendido, condicion });  

    res.status(201).json(newProduct);
};

export const updateProduct =  async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, categoria, imagen, vendido, condicion } = req.body;

    if (!nombre || !precio || !categoria || !imagen || vendido === undefined || !condicion) {
        return res.status(422).json({ message: "Todos los campos son obligatorios", });
    }

    const updatedProduct = await updateProductModel (id, {
        nombre, precio, categoria, imagen, vendido, condicion
    });

    if(!updatedProduct) {
        return res.status(404).json({message: "Producto no encontrado" })
    }

    res.json(updatedProduct)

};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    const deletedProduct = await deleteProductModel(id);

    if(!deletedProduct) {
        return res.status(404).json({ message: "Producto no encontrado"});
    }

    res.json({
        message: "Producto eliminado",
        product: deletedProduct,
    });   
};