import {
  listProducts,
  findProductById,
  addProduct,
  deleteProductById,
} from "../services/products.service.js";

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await listProducts(req.query.category);
    return res.json(products);
  } catch (error) {
    return next(error);
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  const id = Number(req.params.id);
  const product = await findProductById(id);

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  return res.json(product);
};

// POST /api/products/create
export const createProduct = async (req, res) => {
  const { name, price, category } = req.body;
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof category !== "string" ||
    !category.trim() ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return res.status(400).json({
      message:
        "Enviá un nombre, una categoría y un precio numérico mayor que cero",
    });
  }

  try {
    const product = await addProduct({
      name: name.trim(),
      price,
      category: category.trim(),
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return next(error);
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await deleteProductById(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(204).end();
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return next(error);
  }
};
