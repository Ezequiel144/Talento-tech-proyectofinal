import { Router } from "express";
import {
  getProductById,
  getProducts,
  createProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

//GET
router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/create",verifyToken, createProduct);

router.delete("/:id",verifyToken, deleteProduct);


export default router;
