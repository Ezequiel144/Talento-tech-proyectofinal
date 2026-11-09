import { Router } from "express";
import { login } from "../controllers/auth.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Auth route");
});

router.post("/login", login);
export default router;