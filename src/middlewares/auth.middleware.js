import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authorization = req.get("Authorization") ?? "";
  const match = /^Bearer\s+(\S+)$/i.exec(authorization);

  if (!match) {
    res.set("WWW-Authenticate", "Bearer");
    return res.status(401).json({ message: "Enviá un token Bearer" });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return next(new Error("Falta configurar JWT_SECRET en .env"));
  }

  try {
    req.user = jwt.verify(match[1], secret, { algorithms: ["HS256"] });
  } catch {
    res.set("WWW-Authenticate", 'Bearer error="invalid_token"');
    return res.status(401).json({ message: "Token inválido o vencido" });
  }

  return next();
};