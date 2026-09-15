// import db from './firebase.js';
// // 1. Agregamos 'collection' a la importación
// import { addDoc, collection, getDocs } from "firebase/firestore";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import productsRouter from "./src/routes/products.router.js";
import categoriesRouter from "./src/routes/categories.router.js";

const app = express();

// Servir archivos estáticos de la carpeta public
app.use(express.static('public'));

app.use(express.json());

// CORS configurado para Vercel y para pruebas en local
const allowedOrigins = [
  'https://front-maria-theta.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por CORS'));
    }
  },
  credentials: true
}));

// --- Rutas de la API ---
app.use("/api/products", productsRouter); 
app.use("/api/categories", categoriesRouter);

// Endpoint de autenticación (Login)
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Verificamos credenciales contra las variables de entorno
  if (email === adminEmail && password === adminPassword) {
    return res.json({
      success: true,
      user: { email: adminEmail, role: "admin" }
    });
  }

  // Si no coinciden
  return res.status(401).json({
    success: false,
    error: "Credenciales inválidas"
  });
});

// Rutas informativas
app.get("/", (req, res) => {
  res.send(`
    <h1>Bienvenido a la API de productos</h1>
    <p>Servidor funcionando correctamente</p>
  `);
});

app.get("/up", (req, res) => {
  res.json({
    status: "ok",
    message: "Servidor activo",
  });
});

// Middleware 404 (siempre al final de todas las rutas)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3001;

// Solo escucha en puerto en entorno local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
}

// Exportamos la app para Vercel
export default app;

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