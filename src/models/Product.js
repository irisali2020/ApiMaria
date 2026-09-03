import db from "../config/firebase.js";

import { collection, getDoc, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

const productsCollection = collection(db, "products");

// CRUD - Create, Read, Update, Delete

export const fetchProducts = async () => {

    const snapshot = await getDoc(productsCollection);

    const products = [];

    snapshot.forEach((doc) => {
        products.push({
            id: doc.id,
            ...doc.data(),
        });
    });

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
