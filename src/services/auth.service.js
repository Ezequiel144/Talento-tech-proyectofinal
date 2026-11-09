import jwt from "jsonwebtoken";

export const authenticateUser = (email, password) => {
  const { AUTH_EMAIL, AUTH_PASSWORD, JWT_SECRET } = process.env;

  if (!AUTH_EMAIL || !AUTH_PASSWORD || !JWT_SECRET) {
    throw new Error("Falta configurar el login en .env");
  }

  if (email !== AUTH_EMAIL || password !== AUTH_PASSWORD) {
    return null;
  }

  return jwt.sign({ sub: AUTH_EMAIL }, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};