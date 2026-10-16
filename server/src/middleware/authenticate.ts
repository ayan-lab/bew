
import type { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedUser {
  id: string;
}

interface DecodedToken {
  user: AuthenticatedUser;
}

export const authenticate: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : undefined;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    res.status(500).json({ message: "Server configuration error" });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as DecodedToken;

    req.user = decoded.user;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
