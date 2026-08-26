// import db from './firebase.js';
// // 1. Agregamos 'collection' a la importación
// import { addDoc, collection, getDocs } from "firebase/firestore";

import express from "express";

import productsRouter from "./src/routes/products.router.js";

const app = express();

app.use(express.json());
app.use('/api/products',productsRouter); 

app.get("/", (req, res) => {
    res.send(
`<h1>Bienvenido a la API de productos</h1>
<p>Servidor funcionando correctamente</p>
`);
});



const PORT = 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

// DESDE AQUI EN ADELANTE ESTA EL CODIGO PARA CREAR LA COLECCION DE PRODUCTOS EN FIREBASE, PERO NO SE ESTA USANDO EN EL SERVIDOR, SOLO SE DEJO COMO REFERENCIA

// const productsCollection = collection(db, "products");

// const createProduct = async () => {
//     const product = {
//        nombre: 'Producto de prueba',
//        precio: 100,
//        categoria: 'Este es un producto de prueba',
//        imagen: 'https://via.placeholder.com/150',
//        vendido: false,
//        condicion: 'Nuevo'    
//     };
    
//     // 2. Pasamos el objeto 'product' a la función addDoc
//     const result = await addDoc(collection(db, "products"), product);

//     // 3. Imprimimos el ID para confirmar que se creó
//     console.log("Producto guardado con el ID: ", result.id);
// }

// createProduct();

// LEER DOCUMENTOS

// const getProducts = async () => {
//     const snapshot = await getDocs(productsCollection)

//     snapshot.forEach((doc) => {
//         console.log({
//             id: doc.id,
//             ...doc.data(),
//         });
//     });
// };

// getProducts();