import { Request, Response, NextFunction } from "express";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { z, ZodError } from "zod";

export const cadastroGrowdeverValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const msgFormatoInvalido = "Formato inválido";
  const msgCampoObrigatorio = "Campo obrigatório";

  const growdeverScheme = z.object({
    nome: z.string({
      invalid_type_error: msgFormatoInvalido,
      required_error: msgCampoObrigatorio,
    }),
    cpf: z
      .string({
        invalid_type_error: msgFormatoInvalido,
        required_error: msgCampoObrigatorio,
      })
      .transform((valor, ctx) => {
        const cpfLimpo = valor.replace(/[^a-zA-Z0-9]/g, "");

        if (!cpfValidator.isValid(valor)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "CPF Inválido",
          });

          return z.NEVER;
        }

        return cpfLimpo;
      }),
    dataNascimento: z.string({
      invalid_type_error: msgFormatoInvalido,
      required_error: msgCampoObrigatorio,
    }),
    habilidades: z.array(
      z.string({
        invalid_type_error: msgFormatoInvalido,
        required_error: msgCampoObrigatorio,
      }),
      {
        invalid_type_error: msgFormatoInvalido,
        required_error: msgCampoObrigatorio,
      }
    ),
  });

  try {
    const novoCorpo = growdeverScheme.parse(req.body);

    req.body = novoCorpo;

    next();
  } catch (error: any) {
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
