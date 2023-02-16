import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { StatusGrowdever } from "../models/growdever";

export const atualizaGrowdeverValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const msgFormatoInvalido = "Formato inválido";

  const growdeverScheme = z
    .object({
      nome: z.string({
        invalid_type_error: msgFormatoInvalido,
      }),

      dataNascimento: z.string({
        invalid_type_error: msgFormatoInvalido,
      }),

      status: z.nativeEnum(StatusGrowdever),
    })
    .partial();

  try {
    const novoCorpo = growdeverScheme.parse(req.body);

    req.body = novoCorpo;

    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(
        error.issues.map((issue) => ({
          campo: issue.path[0],
          mensagem: issue.message,
          codigo: issue.code,
        }))
      );
    }
    throw error;
  }
};
