import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";

export const usermiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
<<<<<<< HEAD

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized User" });
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // @ts-ignore
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized User" });
=======
  const decoded = jwt.verify(header as string, JWT_SECRET);

  if (decoded) {
    // @ts-ignore
    req.userId = decoded.id;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized User" });
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
  }
};
