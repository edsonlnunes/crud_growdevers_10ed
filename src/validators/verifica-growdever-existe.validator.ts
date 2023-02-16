import { Request, Response, NextFunction } from "express";
import { buscarGrowdeversDB } from "../db/growdevers";

export const verificaGrowdeverExisteValidator = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;

  const listaDeGrowdevers = buscarGrowdeversDB();

  const growdeverExiste = listaDeGrowdevers.some(
    (growdever) => growdever.id === id
  );

  if (!growdeverExiste) {
    return response.status(404).json("Esse growdever nunca foi cadastrado.");
  }

  return next();
};
