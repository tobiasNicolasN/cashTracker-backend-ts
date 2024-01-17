import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";
import { IJwtPayload } from "../libs/jwt";

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
