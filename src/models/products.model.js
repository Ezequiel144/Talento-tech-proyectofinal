import {
    collection,
    doc,
    getDocs,
    runTransaction,
    setDoc
} from "firebase/firestore";
import { db } from "../config/firebase.js";

/* const products = [
  { id: 1, name: "Product 1", price: 10.99, category: "Category 1" },
  { id: 2, name: "Product 2", price: 19.99, category: "Category 2" },
  { id: 3, name: "Product 3", price: 5.99, category: "Category 1" },
]; */

export const findById = async (id) => {
  const allProducts = await findAll();
  return allProducts.find((product) => product.id === id) ?? null;
};

export const findProductsByCategory = async (category) => {
  const allProducts = await findAll();
  return allProducts.filter((product) => product.category === category);
};

export const findIndexById = (id) => {
  return products.findIndex((product) => product.id === id);
};

export const findAll = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => doc.data());
};

const getNextId = async () => {
  const productsAll = await findAll();
  const ids = productsAll.map((product) => product.id);

  return Math.max(0, ...ids) + 1;
};

export const create = async ({ name, price, category }) => {
  const productRef = doc(collection(db, "products"));
  const newProduct = { id: productRef.id, name, price, category };

  await setDoc(productRef, newProduct);

  return newProduct;
};

export const removeById = async (id) => {
  const productRef = doc(db, "products", id);

  return runTransaction(db, async (transaction) => {
    const product = await transaction.get(productRef);

    if (!product.exists()) {
      return false;
    }

    transaction.delete(productRef);
    return true;
  });
};
