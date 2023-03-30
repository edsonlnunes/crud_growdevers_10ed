import { Request, Response, NextFunction } from "express";
import db from "../db";

export const verificaGrowdeverExisteValidator = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;

  const resultadoExiste = await db.query(
    `SELECT * FROM growdevers WHERE id = '${id}'`
  );

  if (resultadoExiste.rowCount === 0) {
    return response.status(404).json("Esse growdever nunca foi cadastrado.");
  }

  return next();
};
