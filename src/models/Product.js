import db from "../config/firebase.js";
import { collection, getDoc, doc, addDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";

const productsCollection = collection(db, "products");

// Pasamos un objeto vacío por defecto por si llamas a la función sin parámetros
export const fetchProducts = async ({ search, category } = {}) => { 

    const snapshot = await getDocs(productsCollection);
    let products = [];

    snapshot.forEach((doc) => {
        products.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    // 1. Filtrar por nombre (búsqueda)
    if (search) {
        const busqueda = search.toLowerCase();
        products = products.filter(product => 
            product.nombre.toLowerCase().includes(busqueda)
        );
    }

    // 2. Filtrar por categoría (opcional, si también lo usas en el front)
    if (category) {
        products = products.filter(product => 
            product.categoria === category
        );
    }

    return products;
};

// Obtener un solo producto

export const getProductById = async(id) => {
const productRef = doc(productsCollection, id)
const snapshot = await getDoc(productRef)

if(!snapshot.exists()) {
    return null;
}

return {
    id: snapshot.id,
    ...snapshot.data(),
    };
};

export const createProduct = async (product) => {
    const productRef = await addDoc(productsCollection, product)

    return {
        id: productRef.id,
        ...product
    };
};

export const updateProduct = async (id, product) => {
    const productRef = doc(productsCollection, id)
    const snapshot = await getDoc(productRef)

    if(!snapshot.exists()) {
    return null;
    }

    await updateDoc(productRef, product)

    return {
        id,
        ...product,
    };
};

export const deleteProduct = async (id) => {
     const productRef = doc(productsCollection, id)
    const snapshot = await getDoc(productRef)

    if(!snapshot.exists()) {
    return null;
    }

    const deletedProduct = {
        id: snapshot.id,
        ...snapshot.data(),
    };

    await deleteDoc(productRef);

    return deletedProduct;
};
