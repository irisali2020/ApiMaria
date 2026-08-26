// Controlador de los productos: tiene la logica

const products = [{
       id: 1, nombre: "Lampara", precio: 100, categoria: "Decoración", imagen: "https://via.placeholder.com/150", vendido: false, condicion: "Nuevo"},
        {id: 2, nombre: "Silla", precio: 200, categoria: "Muebles", imagen: "https://via.placeholder.com/150", vendido: false, condicion: "Nuevo"}, ];    

export const getProducts = (req, res) => {
    res.json(products);
};

export const getProductById = (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((product) => product.id === id);

    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado", });
    }

    res.json(product);
};

export const createProduct = (req, res) => {
    const { nombre, precio, categoria, imagen, vendido, condicion } = req.body;

    if (!nombre || !precio || !categoria || !imagen || vendido === undefined || !condicion) {
        return res.status(400).json({ message: "Todos los campos son obligatorios", });
    }

    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        nombre,
        precio,
        categoria,
        imagen,
        vendido,
        condicion
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
};

export const deleteProduct = (req, res) => {
    const id = Number(req.params.id);
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Producto no encontrado", });
    }

    const deletedProduct = products.splice(productIndex, 1);
    res.json({ message: "Producto eliminado correctamente", product: deletedProduct[0], });
};