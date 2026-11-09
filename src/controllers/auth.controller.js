import { authenticateUser } from "../services/auth.service.js";

export const login = (req, res, next) => {
  const { email, password } = req.body ?? {};

  if (
    typeof email !== "string" || !email.trim() ||
    typeof password !== "string" || !password
  ) {
    return res.status(400).json({ message: "Ingresá email y contraseña" });
  }

  try {
    const token = authenticateUser(email, password);

    if (!token) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
};