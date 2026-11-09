import {
  findAll,
  findById,
  findProductsByCategory,
  create,
  removeById,
} from "../models/products.model.js";

export const listProducts = async (category) => {
  if (category) {
    return await findProductsByCategory(category);
  }

  return await findAll();
};

export const findProductById = async (id) => {
  return await findById(id);
};

export const addProduct = async (productData) => {
  return await create(productData);
};

export const deleteProductById = async (id) => {
  return await removeById(id);
};