import { Request, Response, NextFunction } from "express";
import { GrowdeverRepository } from "../repositories/growdever.repository";

export const verificaGrowdeverExisteValidator = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;

  const repositorio = new GrowdeverRepository();

  const growdeverExiste = await repositorio.existePeloId(id);

  if (!growdeverExiste) {
    return response.status(404).json("Esse growdever nunca foi cadastrado.");
  }

  return next();
};
