import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default (request: Request, response: Response, next: NextFunction) => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return response.status(403).json("Usuário não autorizado.");
  }

  // Bearer TOKEN

  const token = authorization?.split(" ")[1];

  if (!token) {
    return response.status(403).json("Usuário não autorizado.");
  }

  try {
    jwt.verify(token, "growFullStack10ed");
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return response.status(403).json("Token expirado");
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return response.status(403).json("Usuário não autorizado.");
    }

    throw error;
  }
};
