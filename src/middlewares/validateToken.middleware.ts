import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/dotenv";
import { IJwtPayload } from "../libs/jwt.lib";

/**
 * Verifica si el Token existe en las cookies para dar autorizacion al usuario.
 * Guarda el ID del usuario en el req.body.userId
 */

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token available" });
  }
  try {
    const decodedToken = jwt.verify(token, TOKEN_SECRET!) as IJwtPayload;
    req.body.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
};
