import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define what our decoded token will look like
interface JwtPayload {
  userId: string;
}

// Extend Express's Request type to include a `user` field
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER:", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded; // Now allowed by TS
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
