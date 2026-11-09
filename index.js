import express from "express";
import cors from "cors";
import productsRoutes from "./src/routes/products.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import "dotenv/config";
import { connectFirebase } from "./src/config/firebase.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/products", productsRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

await connectFirebase();

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

